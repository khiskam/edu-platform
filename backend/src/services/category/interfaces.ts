import { Category } from "@domain/category";
import { Lesson, LessonProgress } from "@domain/lesson";

export type CreateCategoryDTO = Omit<Category, "id">;

export type CategoryProgress = Category & {
  completedCount: number;
  totalCount: number;
};

export interface ICategoryRepository {
  getAll(limit: number, offset: number, search?: string): Promise<Category[]>;
  getOne(categoryId: string): Promise<Category | null>;

  create(category: CreateCategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(categoryId: string): Promise<void>;

  getTotalCount(search?: string): Promise<number>;
}

export interface ICategoryProgressRepository {
  getAllProgress(
    userId: string,
    limit: number,
    offset: number,
    search?: string
  ): Promise<CategoryProgress[]>;
  getOneProgress(categoryId: string, userId: string): Promise<CategoryProgress | null>;
}

export interface ILessonsByCategoryRepository {
  getAllLessons(
    categoryId: string,
    limit: number,
    offset: number,
    search?: string
  ): Promise<Lesson[]>;
  getAllLessonsProgress(
    categoryId: string,
    userId: string,
    limit: number,
    offset: number,
    search?: string
  ): Promise<LessonProgress[]>;

  getLessonsCount(categoryId: string, search?: string): Promise<number>;
}
