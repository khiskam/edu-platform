import { CompletedTask, Task, TaskProgress } from "@domain/task";

export type Answer = Pick<CompletedTask, "taskId" | "userId"> & { answers: string[] };
export type CreateTaskDTO = Omit<Task, "id">;

export type CreateCompletedTaskDTO = Pick<CompletedTask, "taskId" | "userId">;

export interface ITaskRepository {
  getOne(id: string): Promise<Task | null>;

  create(task: CreateTaskDTO): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}

export interface ITaskProgressRepository {
  getOneProgress(taskId: string, userId: string): Promise<TaskProgress | null>;
}

export interface ICompletedTaskRepository {
  createCompleted(data: CreateCompletedTaskDTO): Promise<CompletedTask>;

  deleteAllCompleted(taskId: string): Promise<void>;
}
