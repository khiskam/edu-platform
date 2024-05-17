import { TaskDTO } from "./dto";
import { CompletedTask, Task } from "@domain/task";

export interface ITaskRepository {
  getAll(limit: number, offset: number): Promise<Task[]>;
  getOne(id: string): Promise<Task | null>;
  create(category: TaskDTO): Promise<Task>;
  update(category: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}

export interface ICompletedTaskRepository {
  create(data: CompletedTask): Promise<CompletedTask>;
  delete(data: CompletedTask): Promise<void>;
}
