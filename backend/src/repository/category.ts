import { Category, CategoryKeys } from "@domain/category";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CategoryProgress,
  CreateCategoryDTO,
  ICategoryRepository,
  LessonProgress,
} from "@repository/interfaces";
import { PRISMA_CODES } from "./constants";
import { DatabaseError } from "./DatabaseError";

export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly _client: PrismaClient) {}

  async count(): Promise<number> {
    return await this._client.category.count();
  }

  lessonsCountByCategoryId = async (categoryId: string): Promise<number> => {
    return await this._client.lesson.count({ where: { categoryId } });
  };

  async getAll(limit: number, offset: number): Promise<Category[]> {
    return await this._client.category.findMany({ skip: offset, take: limit });
  }

  async getAllWithProgress(
    userId: string,
    limit: number,
    offset: number
  ): Promise<CategoryProgress[]> {
    const categories = await this._client.category.findMany({
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

  getAllLessonsByCategoryIdWithProgress = async (
    categoryId: string,
    userId: string,
    limit: number,
    offset: number
  ): Promise<LessonProgress[]> => {
    const lessons = await this._client.lesson.findMany({
      where: { categoryId },
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
        completedCount:
          lesson.completedLesson.length +
          lesson.task.reduce((lessonAcc, task) => {
            return lessonAcc + task.completedTask.length;
          }, 0),

        totalCount: lesson.task.length + 1,
      };
    });
  };

  getOneWithProgress = async (
    categoryId: string,
    userId: string
  ): Promise<CategoryProgress | null> => {
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
  };

  async getOne(id: string): Promise<Category | null> {
    return await this._client.category.findFirst({ where: { id } });
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
    const { id, name } = category;
    try {
      return await this._client.category.update({ where: { id }, data: { name } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<CategoryKeys>("Категория уже существует", "client", "name");
        }
      }

      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this._client.category.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new DatabaseError<CategoryKeys>("Категория не найдена", "notFound", "name");
        }
      }

      throw e;
    }
  }
}
