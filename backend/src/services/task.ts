import { CompletedTaskWithAnswer, TaskKeys } from "@domain/task";
import { ClientError } from "./error";
import { ITaskRepository } from "@repository/interfaces";
import { CreateTask, UpdateTask, checkAnswers, createTaskDTO, updateTaskDTO } from "./utils";

export class TaskService {
  constructor(private readonly _repo: ITaskRepository) {}

  async getAll(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const tasks = await this._repo.getAll(limit, offset);
    const totalCount = await this._repo.count();
    return { tasks, totalCount };
  }

  async getOne(id: string) {
    return await this._repo.getOne(id);
  }

  async getOneWithProgress(taskId: string, userId: string) {
    return await this._repo.getOneWithProgress(taskId, userId);
  }

  async create(task: CreateTask) {
    task.title = task.title.trim();
    task.description = task.description.trim();

    const data = createTaskDTO(task);
    return await this._repo.create(data);
  }

  async update(task: UpdateTask) {
    task.title = task.title.trim();
    task.description = task.description.trim();

    const data = updateTaskDTO(task);

    const updatedTask = await this._repo.update({ ...data, id: task.id });
    await this._repo.deleteCompletedTasksByTaskId(task.id);

    return updatedTask;
  }

  async delete(id: string) {
    return await this._repo.delete(id);
  }

  async completedCreate(data: CompletedTaskWithAnswer) {
    const task = await this._repo.getOne(data.taskId);

    if (!task) {
      throw new ClientError<TaskKeys>("Задания не существует", "id");
    }

    if (checkAnswers(data.answers, task.correctAnswers)) {
      throw new ClientError<TaskKeys>("Неверный ответ", "answers");
    }

    return await this._repo.createCompleted(data);
  }
}
