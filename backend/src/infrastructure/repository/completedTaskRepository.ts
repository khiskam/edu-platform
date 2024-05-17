import { Prisma, PrismaClient } from "@prisma/client";

import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";
import { CompletedLessonKeys, LessonKeys } from "@domain/lesson";
import { ICompletedTaskRepository } from "@services/task/interfaces";
import { CompletedTask } from "@domain/task";

export class CompletedTaskRepository implements ICompletedTaskRepository {
  constructor(private readonly _client: PrismaClient) {}

  async create(data: CompletedTask): Promise<CompletedTask> {
    try {
      return await this._client.completedTask.create({ data });
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

  async delete(data: CompletedTask): Promise<void> {
    const { userId, taskId } = data;
    try {
      await this._client.completedTask.delete({
        where: { userId_taskId: { userId, taskId } },
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
