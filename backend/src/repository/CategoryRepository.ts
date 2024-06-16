import { Category } from "@domain/category";
import { Lesson, LessonProgress } from "@domain/lesson";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CategoryProgress,
  CreateCategoryDTO,
  ICategoryProgressRepository,
  ICategoryRepository,
  ILessonsByCategoryRepository,
} from "@services/category/interfaces";

import { PRISMA_CODES } from "./constants";
import { DatabaseError } from "./DatabaseError";

type CategoryKeys = keyof Category;

export class CategoryRepository
  implements ICategoryRepository, ICategoryProgressRepository, ILessonsByCategoryRepository
{
  constructor(private readonly _client: PrismaClient) {}

  async getAll(limit: number, offset: number, search?: string): Promise<Category[]> {
    return await this._client.category.findMany({
      skip: offset,
      take: limit,
      where: { name: { startsWith: search, mode: "insensitive" } },
    });
  }

  async getOne(categoryId: string): Promise<Category | null> {
    return await this._client.category.findFirst({ where: { id: categoryId } });
  }

  async create(category: CreateCategoryDTO): Promise<Category> {
    try {
      return await this._client.category.create({ data: category });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<CategoryKeys>("Категория уже существует", "client", "name");
        }
      }

      throw e;
    }
  }

  async update(category: Category): Promise<Category> {
    const { id, name, description } = category;

    try {
      return await this._client.category.update({ where: { id }, data: { name, description } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new DatabaseError<CategoryKeys>("Категория не найдена", "notFound", "id");
        }
      }

      throw e;
    }
  }

  async delete(categoryId: string): Promise<void> {
    try {
      await this._client.category.delete({ where: { id: categoryId } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new DatabaseError<CategoryKeys>("Категория не найдена", "notFound", "name");
        }
      }

      throw e;
    }
  }

  async getTotalCount(search?: string): Promise<number> {
    return await this._client.category.count({
      where: { name: { startsWith: search, mode: "insensitive" } },
    });
  }

  async getAllProgress(
    userId: string,
    limit: number,
    offset: number,
    search?: string
  ): Promise<CategoryProgress[]> {
    const categories = await this._client.category.findMany({
      where: { name: { startsWith: search, mode: "insensitive" } },
      skip: offset,
      take: limit,
      include: {
        lessons: {
          select: {
            completedLesson: { where: { userId } },
            task: { select: { completedTask: { where: { userId } } } },
          },
        },
      },
    });

    return categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        description: category.description,
        completedCount: category.lessons.reduce((acc, lesson) => {
          return (
            acc +
            lesson.completedLesson.length +
            lesson.task.reduce((lessonAcc, task) => {
              return lessonAcc + task.completedTask.length;
            }, 0)
          );
        }, 0),

        totalCount:
          category.lessons.length +
          category.lessons.reduce((acc, lesson) => {
            return acc + lesson.task.length;
          }, 0),
      };
    });
  }

  async getOneProgress(categoryId: string, userId: string): Promise<CategoryProgress | null> {
    const category = await this._client.category.findFirst({
      where: { id: categoryId },
      include: {
        lessons: {
          select: {
            completedLesson: { where: { userId } },
            task: { select: { completedTask: { where: { userId } } } },
          },
        },
      },
    });

    if (!category) return null;

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      completedCount: category.lessons.reduce((acc, lesson) => {
        return (
          acc +
          lesson.completedLesson.length +
          lesson.task.reduce((lessonAcc, task) => {
            return lessonAcc + task.completedTask.length;
          }, 0)
        );
      }, 0),

      totalCount:
        category.lessons.length +
        category.lessons.reduce((acc, lesson) => {
          return acc + lesson.task.length;
        }, 0),
    };
  }

  async getAllLessons(
    categoryId: string,
    limit: number,
    offset: number,
    search?: string | undefined
  ): Promise<Lesson[]> {
    return await this._client.lesson.findMany({
      where: { categoryId, title: { startsWith: search, mode: "insensitive" } },
      skip: offset,
      take: limit,
    });
  }
  async getAllLessonsProgress(
    categoryId: string,
    userId: string,
    limit: number,
    offset: number,
    search?: string | undefined
  ): Promise<LessonProgress[]> {
    const lessons = await this._client.lesson.findMany({
      where: { categoryId, title: { startsWith: search, mode: "insensitive" } },
      skip: offset,
      take: limit,
      include: {
        task: { select: { completedTask: { where: { userId } } } },
        completedLesson: { where: { userId } },
      },
    });

    return lessons.map((lesson) => {
      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        layout: lesson.layout,
        isCompleted: !!lesson.completedLesson.length,
        completedCount:
          lesson.completedLesson.length +
          lesson.task.reduce((lessonAcc, task) => {
            return lessonAcc + task.completedTask.length;
          }, 0),

        totalCount: lesson.task.length + 1,
      };
    });
  }

  async getLessonsCount(categoryId: string, search?: string | undefined): Promise<number> {
    return await this._client.lesson.count({
      where: { categoryId, title: { startsWith: search, mode: "insensitive" } },
    });
  }
}
