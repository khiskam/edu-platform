import { Prisma, PrismaClient } from "@prisma/client";

import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";
import { ITaskRepository } from "@services/task/interfaces";
import { CompletedTask, Task, TaskKeys } from "@domain/task";
import { TaskDTO, TaskWithCompleted } from "@services/task/dto";

export class TaskRepository implements ITaskRepository {
  constructor(private readonly _client: PrismaClient) {}

  async getOneCompleted(data: CompletedTask): Promise<TaskWithCompleted | null> {
    return await this._client.task.findFirst({
      where: { id: data.taskId },
      include: { completedTask: { where: { ...data } } },
    });
  }

  async count(): Promise<number> {
    return await this._client.task.count();
  }

  async getAll(limit: number, offset: number): Promise<Task[]> {
    return await this._client.task.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getOne(id: string): Promise<Task | null> {
    return await this._client.task.findFirst({ where: { id } });
  }

  async create(task: TaskDTO): Promise<Task> {
    return await this._client.task.create({ data: task });
  }

  async update(task: Task): Promise<Task> {
    const { id, title, description, correctAnswers, answers, lessonId } = task;
    return await this._client.task.update({
      where: { id },
      data: { title, description, lessonId, answers, correctAnswers },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this._client.task.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new ClientError<TaskKeys>("Занятие не найдено", 404, "id");
        }
      }

      throw e;
    }
  }
}
