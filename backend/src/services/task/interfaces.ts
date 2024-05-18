import { TaskDTO, TaskWithCompleted } from "./dto";
import { CompletedTask, Task } from "@domain/task";

export interface ITaskRepository {
  getAll(limit: number, offset: number): Promise<Task[]>;
  getOne(id: string): Promise<Task | null>;
  getOneCompleted(data: CompletedTask): Promise<TaskWithCompleted | null>;
  create(category: TaskDTO): Promise<Task>;
  update(category: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;

  createCompleted(data: CompletedTask): Promise<CompletedTask>;
  deleteCompleted(data: CompletedTask): Promise<void>;
}
