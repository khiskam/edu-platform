import { Prisma, PrismaClient } from "@prisma/client";

import { PRISMA_CODES } from "./constants";
import { CreateLessonDTO, ILessonRepository, LessonProgress } from "@repository/interfaces";
import { CompletedLesson, CompletedLessonKeys, Lesson, LessonKeys } from "@domain/lesson";
import { DatabaseError } from "./DatabaseError";

export class LessonRepository implements ILessonRepository {
  constructor(private readonly _client: PrismaClient) {}

  async count(): Promise<number> {
    return await this._client.lesson.count();
  }

  async getAll(limit: number, offset: number): Promise<Lesson[]> {
    return await this._client.lesson.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getOne(id: string): Promise<Lesson | null> {
    return await this._client.lesson.findFirst({
      where: { id },
    });
  }

  getOneWithProgress = async (lessonId: string, userId: string): Promise<LessonProgress | null> => {
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
  };

  async create(lesson: CreateLessonDTO): Promise<Lesson> {
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
          throw new DatabaseError<LessonKeys>("Занятие не найдено", "notFound", "id");
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
          throw new DatabaseError<CompletedLessonKeys>(
            "Задание уже выполнено",
            "client",
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
          throw new DatabaseError<LessonKeys>("Занятие не найдено", "notFound", "id");
        }
      }

      throw e;
    }
  }
}
