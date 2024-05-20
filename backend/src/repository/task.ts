import { Prisma, PrismaClient } from "@prisma/client";

import { PRISMA_CODES } from "./constants";
import { CreateTaskDTO, ITaskRepository, TaskWithProgress } from "@repository/interfaces";
import { CompletedTask, CompletedTaskKeys, Task, TaskKeys } from "@domain/task";
import { DatabaseError } from "./DatabaseError";

export class TaskRepository implements ITaskRepository {
  constructor(private readonly _client: PrismaClient) {}

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

  async getOneWithProgress(taskId: string, userId: string): Promise<TaskWithProgress | null> {
    const task = await this._client.task.findFirst({
      where: { id: taskId },
      include: { completedTask: { where: { userId } } },
    });

    if (!task) {
      return null;
    }

    return {
      id: task.id,
      title: task.title,
      isCompleted: !!task.completedTask.length,
    };
  }

  async create(task: CreateTaskDTO): Promise<Task> {
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
          throw new DatabaseError<TaskKeys>("Занятие не найдено", "notFound", "id");
        }
      }

      throw e;
    }
  }

  async deleteCompletedTasksByTaskId(taskId: string): Promise<void> {
    await this._client.completedTask.deleteMany({ where: { taskId } });
  }

  async createCompleted(data: CompletedTask): Promise<CompletedTask> {
    try {
      return await this._client.completedTask.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<CompletedTaskKeys>(
            "Задание уже выполнено",
            "client",
            "userIdTaskId"
          );
        }
      }

      throw e;
    }
  }
}
