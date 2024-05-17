import { ICompletedTaskRepository, ITaskRepository } from "./interfaces";
import { MutationDTO, MutationDTOWithId } from "./dto";
import { MutationDTOtoTaskDTO } from "./utils";
import { CompletedTask } from "@domain/task";

export class TaskService {
  constructor(
    private readonly _repo: ITaskRepository,
    private readonly _completedRepo: ICompletedTaskRepository
  ) {}

  async getAll(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const tasks = await this._repo.getAll(limit, offset);
    const totalCount = await this._repo.count();
    return { tasks, totalCount };
  }

  async getOne(id: string) {
    return await this._repo.getOne(id);
  }

  async create(task: MutationDTO) {
    task.title = task.title.trim();
    task.description = task.description.trim();

    const data = MutationDTOtoTaskDTO(task);
    return await this._repo.create(data);
  }

  async update(task: MutationDTOWithId) {
    task.title = task.title.trim();
    task.description = task.description.trim();

    const data = MutationDTOtoTaskDTO(task);
    return await this._repo.update({ ...data, id: task.id });
  }

  async delete(id: string) {
    return await this._repo.delete(id);
  }

  async completedCreate(data: CompletedTask) {
    return await this._completedRepo.create(data);
  }

  async completedDelete(data: CompletedTask) {
    return await this._completedRepo.delete(data);
  }
}
