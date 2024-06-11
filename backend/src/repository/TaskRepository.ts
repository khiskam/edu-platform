import { CompletedTask, Task, TaskProgress } from "@domain/task";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateTaskDTO,
  ICompletedTaskRepository,
  ITaskProgressRepository,
  ITaskRepository,
} from "@services/task/interfaces";

import { PRISMA_CODES } from "./constants";
import { DatabaseError } from "./DatabaseError";

type TaskKeys = keyof Task;
type CompletedTaskKeys = keyof CompletedTask;

export class TaskRepository
  implements ITaskRepository, ITaskProgressRepository, ICompletedTaskRepository
{
  constructor(private readonly _client: PrismaClient) {}

  async getOne(id: string): Promise<Task | null> {
    return await this._client.task.findFirst({ where: { id } });
  }

  async create(task: CreateTaskDTO): Promise<Task> {
    return await this._client.task.create({ data: task });
  }

  async update(task: Task): Promise<Task> {
    const { id, title, description, correctAnswers, answers, lessonId } = task;
    try {
      return await this._client.task.update({
        where: { id },
        data: { title, description, lessonId, answers, correctAnswers },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new DatabaseError<TaskKeys>("Задание не найдено", "notFound", "id");
        }
      }

      throw e;
    }
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

  async getOneProgress(taskId: string, userId: string): Promise<TaskProgress | null> {
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
      answers: task.answers,
      description: task.description,
    };
  }

  async createCompleted(data: CompletedTask): Promise<CompletedTask> {
    try {
      return await this._client.completedTask.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<CompletedTaskKeys>("Задание уже выполнено", "client", "taskId");
        }
      }

      throw e;
    }
  }

  async deleteAllCompleted(taskId: string): Promise<void> {
    await this._client.completedTask.deleteMany({ where: { taskId } });
  }
}
