import { CompletedTask, Task } from "@domain/task";

import { ClientError } from "../ClientError";
import {
  Answer,
  CreateTaskDTO,
  ICompletedTaskRepository,
  ITaskProgressRepository,
  ITaskRepository,
} from "./interfaces";
import { checkAnswers } from "./utils";

type TaskKeys = keyof Task;
type CompletedTaskKeys = keyof CompletedTask;

export class TaskService {
  constructor(
    private readonly _repo: ITaskRepository & ITaskProgressRepository & ICompletedTaskRepository
  ) {}

  async getOne(id: string) {
    return await this._repo.getOne(id);
  }

  async getOneProgress(taskId: string, userId: string) {
    return await this._repo.getOneProgress(taskId, userId);
  }

  async create(task: CreateTaskDTO) {
    task.title = task.title.trim();
    task.description = task.description.trim();

    return await this._repo.create(task);
  }

  async update(task: Task) {
    task.title = task.title.trim();
    task.description = task.description.trim();

    const updatedTask = await this._repo.update(task);

    return updatedTask;
  }

  async delete(id: string) {
    return await this._repo.delete(id);
  }

  async completedCreate(data: Answer) {
    const task = await this._repo.getOne(data.taskId);

    if (!task) {
      throw new ClientError<TaskKeys>("Задания не существует", "id");
    }

    const completedTask = await this._repo.checkCompleted(data);

    if (completedTask) {
      throw new ClientError<CompletedTaskKeys>("Задание уже выполнено", "taskId");
    }

    if (!checkAnswers(data.answers, task.correctAnswers)) {
      throw new ClientError<TaskKeys>("Неверный ответ", "answers");
    }

    return await this._repo.createCompleted({ taskId: data.taskId, userId: data.userId });
  }
}
