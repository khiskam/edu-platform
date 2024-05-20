import { Prisma, PrismaClient } from "@prisma/client";

import { PRISMA_CODES } from "./constants";
import {
  CreateLessonDTO,
  ILessonRepository,
  LessonProgress,
  TaskWithProgress,
  UpdateLessonDTO,
} from "@repository/interfaces";
import { CompletedLesson, CompletedLessonKeys, Lesson, LessonKeys } from "@domain/lesson";
import { DatabaseError } from "./DatabaseError";

export class LessonRepository implements ILessonRepository {
  constructor(private readonly _client: PrismaClient) {}

  async count(): Promise<number> {
    return await this._client.lesson.count();
  }

  async tasksCountByLessonId(lessonId: string): Promise<number> {
    return await this._client.task.count({ where: { lessonId } });
  }

  async getAll(limit: number, offset: number): Promise<Lesson[]> {
    return await this._client.lesson.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getAllTasksByLessonIdWithProgress(
    lessonId: string,
    userId: string,
    limit: number,
    offset: number
  ): Promise<TaskWithProgress[]> {
    const tasks = await this._client.task.findMany({
      skip: offset,
      take: limit,
      where: { lessonId },
      include: { completedTask: { where: { userId } } },
    });

    return tasks.map((item) => {
      return { id: item.id, title: item.title, isCompleted: !!item.completedTask.length };
    });
  }

  async getOne(lessonId: string): Promise<Lesson | null> {
    return await this._client.lesson.findFirst({
      where: { id: lessonId },
    });
  }

  async getOneWithProgress(lessonId: string, userId: string): Promise<LessonProgress | null> {
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
      completedCount:
        lesson.completedLesson.length +
        lesson.task.reduce((lessonAcc, task) => {
          return lessonAcc + task.completedTask.length;
        }, 0),

      totalCount: lesson.task.length + 1,
    };
  }

  async create(lesson: CreateLessonDTO): Promise<Lesson> {
    const { title, description, layout, images, categoryId } = lesson;
    return await this._client.$transaction(async () => {
      const createdLesson = await this._client.lesson.create({
        data: { title, description, layout, categoryId },
      });

      await this._client.image.updateMany({
        where: { id: { in: images } },
        data: { lessonId: createdLesson.id },
      });

      return createdLesson;
    });
  }

  async update(lesson: UpdateLessonDTO): Promise<Lesson> {
    const { id, title, description, layout, images, categoryId } = lesson;

    return await this._client.$transaction(async () => {
      const updatedLesson = await this._client.lesson.update({
        where: { id },
        data: { title, description, layout, categoryId },
      });

      await this._client.image.updateMany({
        where: { lessonId: id },
        data: { lessonId: null },
      });

      await this._client.image.updateMany({
        where: { id: { in: images } },
        data: { lessonId: id },
      });

      return updatedLesson;
    });
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

  async deleteCompletedLessonsByLessonId(lessonId: string): Promise<void> {
    await this._client.completedLesson.deleteMany({ where: { lessonId } });
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
            "userIdLessonId"
          );
        }
      }

      throw e;
    }
  }
}
