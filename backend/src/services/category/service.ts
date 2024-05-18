import { ICategoryRepository } from "./interfaces";
import { CategoryDTO } from "./dto";
import { Category } from "@domain/category";

export class CategoryService {
  constructor(private readonly _repo: ICategoryRepository) {}

  async getAll(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getAll(limit, offset);
    const totalCount = await this._repo.count();

    return { categories, totalCount };
  }

  async getOne(id: string) {
    return await this._repo.getOne(id);
  }

  async create(category: CategoryDTO) {
    category.name = category.name.trim();
    return await this._repo.create(category);
  }

  async update(category: Category) {
    category.name = category.name.trim();
    return await this._repo.update(category);
  }

  async delete(id: string) {
    return await this._repo.delete(id);
  }

  async getProgress(userId: string, limit: number, page: number) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getProgress(userId, limit, offset);
    const totalCount = await this._repo.count();

    return { categories, totalCount };
  }
}
