import { Prisma, PrismaClient } from "@prisma/client";

import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";
import { ILessonRepository } from "@services/lesson/interfaces";
import { CompletedLesson, CompletedLessonKeys, Lesson, LessonKeys } from "@domain/lesson";
import { LessonDTO, LessonWithCompleted, Progress } from "@services/lesson/dto";

export class LessonRepository implements ILessonRepository {
  constructor(private readonly _client: PrismaClient) {}

  async count(): Promise<number> {
    return await this._client.lesson.count();
  }

  async getAll(limit: number, offset: number): Promise<Lesson[]> {
    return await this._client.lesson.findMany({
      skip: offset,
      take: limit,
      include: {
        _count: {
          select: {
            completedLesson: {
              where: { userId: "1d5faa03-c158-4b45-8be6-73cee73d6af4" },
            },
          },
        },
      },
    });
  }

  async getOne(id: string): Promise<Lesson | null> {
    return await this._client.lesson.findFirst({
      where: { id },
    });
  }

  async getOneCompleted(data: CompletedLesson): Promise<LessonWithCompleted | null> {
    return await this._client.lesson.findFirst({
      where: { id: data.lessonId },
      include: { completedLesson: { where: { ...data } } },
    });
  }

  async create(lesson: LessonDTO): Promise<Lesson> {
    return await this._client.lesson.create({ data: lesson });
  }

  async update(lesson: Lesson): Promise<Lesson> {
    const { id, title, description, layout, categoryId } = lesson;
    return await this._client.lesson.update({
      where: { id },
      data: { title, description, layout, categoryId },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this._client.lesson.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new ClientError<LessonKeys>("Занятие не найдено", 404, "id");
        }
      }

      throw e;
    }
  }

  async createCompleted(data: CompletedLesson): Promise<CompletedLesson> {
    try {
      return await this._client.completedLesson.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new ClientError<CompletedLessonKeys>(
            "Задание уже выполнено",
            400,
            "userId",
            "lessonId"
          );
        }
      }

      throw e;
    }
  }

  async deleteCompleted(data: CompletedLesson): Promise<void> {
    const { userId, lessonId } = data;
    try {
      await this._client.completedLesson.delete({
        where: { userId_lessonId: { userId, lessonId } },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new ClientError<LessonKeys>("Занятие не найдено", 404, "id");
        }
      }

      throw e;
    }
  }

  async getProgress(userId: string, limit: number, offset: number): Promise<Progress[]> {
    const lessons = await this._client.lesson.findMany({
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
        name: lesson.title,
        completedCount:
          lesson.completedLesson.length +
          lesson.task.reduce((lessonAcc, task) => {
            return lessonAcc + task.completedTask.length;
          }, 0),

        totalCount: lesson.task.length + 1,
      };
    });
  }
}
