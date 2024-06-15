import { Category } from "@domain/category";

import {
  CreateCategoryDTO,
  ICategoryProgressRepository,
  ICategoryRepository,
  ILessonsByCategoryRepository,
} from "./interfaces";

export class CategoryService {
  constructor(
    private readonly _repo: ICategoryRepository &
      ICategoryProgressRepository &
      ILessonsByCategoryRepository
  ) {}

  async getAll(limit: number, page: number, search?: string) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getAll(limit, offset, search);
    const totalCount = await this._repo.getTotalCount(search);

    return { categories, totalCount };
  }

  async getOne(id: string) {
    return await this._repo.getOne(id);
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

  async getAllProgress(userId: string, limit: number, page: number, search?: string) {
    const offset = (page - 1) * limit;
    const categories = await this._repo.getAllProgress(userId, limit, offset, search);
    const totalCount = await this._repo.getTotalCount(search);

    return { categories, totalCount };
  }

  async getOneProgress(categoryId: string, userId: string) {
    const category = await this._repo.getOneProgress(categoryId, userId);

    return category;
  }

  async getAllLessons(categoryId: string, limit: number, page: number, search?: string) {
    const offset = (page - 1) * limit;
    const lessons = await this._repo.getAllLessons(categoryId, limit, offset, search);
    const totalCount = await this._repo.getLessonsCount(categoryId, search);

    return { lessons, totalCount };
  }

  async getAllLessonsProgress(
    categoryId: string,
    userId: string,
    limit: number,
    page: number,
    search?: string
  ) {
    const offset = (page - 1) * limit;
    const lessons = await this._repo.getAllLessonsProgress(
      categoryId,
      userId,
      limit,
      offset,
      search
    );
    const totalCount = await this._repo.getLessonsCount(categoryId, search);

    return { lessons, totalCount };
  }
}
