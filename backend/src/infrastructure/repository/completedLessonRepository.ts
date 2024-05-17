import { Prisma, PrismaClient } from "@prisma/client";

import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";
import { ICompletedLessonRepository } from "@services/lesson/interfaces";
import { CompletedLesson, CompletedLessonKeys, LessonKeys } from "@domain/lesson";

export class CompletedLessonRepository implements ICompletedLessonRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(data: CompletedLesson): Promise<CompletedLesson> {
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

  async delete(data: CompletedLesson): Promise<void> {
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
}
