import { CompletedLesson, Lesson, LessonProgress } from "@domain/lesson";
import { Task, TaskProgress } from "@domain/task";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateLessonDTO,
  ICompletedLessonRepository,
  ILessonProgressRepository,
  ILessonRepository,
  ITasksByLessonRepository,
  UpdateLessonDTO,
} from "@services/lesson/interfaces";

import { PRISMA_CODES } from "./constants";
import { DatabaseError } from "./DatabaseError";

type LessonKeys = keyof Lesson;
type CompletedLessonKeys = keyof CompletedLesson;

export class LessonRepository
  implements
    ILessonRepository,
    ILessonProgressRepository,
    ITasksByLessonRepository,
    ICompletedLessonRepository
{
  constructor(private readonly _client: PrismaClient) {}

  async getTasksCount(lessonId: string, search?: string): Promise<number> {
    return await this._client.task.count({
      where: { lessonId, title: { startsWith: search, mode: "insensitive" } },
    });
  }

  async getOne(lessonId: string): Promise<Lesson | null> {
    return await this._client.lesson.findFirst({
      where: { id: lessonId },
    });
  }

  async create(lesson: CreateLessonDTO): Promise<Lesson> {
    const { title, description, layout, images, categoryId } = lesson;

    return await this._client.$transaction(async () => {
      const createdLesson = await this._client.lesson.create({
        data: { title, description, layout, categoryId },
      });

      await this._client.lessonImage.updateMany({
        where: { id: { in: images } },
        data: { lessonId: createdLesson.id },
      });

      return createdLesson;
    });
  }

  async update(lesson: UpdateLessonDTO): Promise<Lesson> {
    const { id, title, description, layout, images, categoryId } = lesson;

    try {
      return await this._client.$transaction(async () => {
        const updatedLesson = await this._client.lesson.update({
          where: { id },
          data: { title, description, layout, categoryId },
        });

        await this._client.lessonImage.updateMany({
          where: { lessonId: id },
          data: { lessonId: null },
        });

        await this._client.lessonImage.updateMany({
          where: { id: { in: images } },
          data: { lessonId: id },
        });

        return updatedLesson;
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<LessonKeys>("Занятие не найдено", "client", "id");
        }
      }

      throw e;
    }
  }

  async delete(lessonId: string): Promise<void> {
    try {
      await this._client.lesson.delete({ where: { id: lessonId } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new DatabaseError<LessonKeys>("Занятие не найдено", "notFound", "id");
        }
      }

      throw e;
    }
  }

  async getOneProgress(lessonId: string, userId: string): Promise<LessonProgress | null> {
    const lesson = await this._client.lesson.findFirst({
      where: { id: lessonId },
      include: {
        task: { select: { completedTask: { where: { userId } } } },
        completedLesson: { where: { userId } },
      },
    });

    if (!lesson) {
      return null;
    }

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
  }

  async getAllTasks(
    lessonId: string,
    limit: number,
    offset: number,
    search?: string | undefined
  ): Promise<Task[]> {
    return await this._client.task.findMany({
      where: { lessonId, title: { startsWith: search, mode: "insensitive" } },
      take: limit,
      skip: offset,
    });
  }

  async getAllTasksProgress(
    lessonId: string,
    userId: string,
    limit: number,
    offset: number,
    search?: string | undefined
  ): Promise<TaskProgress[]> {
    const tasks = await this._client.task.findMany({
      skip: offset,
      take: limit,
      where: { lessonId, title: { startsWith: search, mode: "insensitive" } },
      include: { completedTask: { where: { userId } } },
    });

    return tasks.map((item) => {
      return {
        id: item.id,
        title: item.title,
        isCompleted: !!item.completedTask.length,
        answers: item.answers,
        description: item.description,
      };
    });
  }

  async createCompleted(data: CompletedLesson): Promise<CompletedLesson> {
    try {
      return await this._client.completedLesson.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<CompletedLessonKeys>(
            "Задание уже выполнено",
            "client",
            "lessonId"
          );
        }
      }

      throw e;
    }
  }
}
