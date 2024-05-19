// import { ICategoryRepository } from "./interfaces";
// import { CategoryDTO } from "./dto";
import { Category } from "@domain/category";
import { CreateCategoryDTO, ICategoryRepository } from "@repository/interfaces";

export type ProgressResponse = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
};

export class CategoryService {
  constructor(private readonly _repo: ICategoryRepository) {}

  async getAll(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getAll(limit, offset);
    const totalCount = await this._repo.count();

    return { categories, totalCount };
  }

  async getAllWithProgress(userId: string, limit: number, page: number) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getAllWithProgress(userId, limit, offset);
    const totalCount = await this._repo.count();

    return { categories, totalCount };
  }

  async getAllLessonsByCategoryIdWithProgress(
    categoryId: string,
    userId: string,
    limit: number,
    page: number
  ) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getAllLessonsByCategoryIdWithProgress(
      categoryId,
      userId,
      limit,
      offset
    );
    const totalCount = await this._repo.lessonsCountByCategoryId(categoryId);

    return { categories, totalCount };
  }

  async getOne(id: string) {
    return await this._repo.getOne(id);
  }

  async getOneWithProgress(categoryId: string, userId: string) {
    const category = await this._repo.getOneWithProgress(categoryId, userId);

    return category;
  }

  async create(category: CreateCategoryDTO) {
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
}
