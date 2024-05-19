import { Category } from "@domain/category";
import { CompletedLesson, Lesson } from "@domain/lesson";
import { User } from "@domain/user";

export type CreateCategoryDTO = Omit<Category, "id">;

export type CategoryProgress = Pick<Category, "id" | "name"> & {
  completedCount: number;
  totalCount: number;
};

export interface ICategoryRepository {
  getAll(limit: number, offset: number): Promise<Category[]>;
  getAllWithProgress(userId: string, pageSize: number, page: number): Promise<CategoryProgress[]>;
  getAllLessonsByCategoryIdWithProgress(
    categoryId: string,
    userId: string,
    limit: number,
    offset: number
  ): Promise<LessonProgress[]>;

  getOne(id: string): Promise<Category | null>;
  getOneWithProgress(categoryId: string, userId: string): Promise<CategoryProgress | null>;

  create(category: CreateCategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;

  count(): Promise<number>;
  lessonsCountByCategoryId(categoryId: string): Promise<number>;
}

export type CreateUserDTO = {
  uid: string;
};

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  getByUid(uid: string): Promise<User | null>;
}

export type CreateLessonDTO = Omit<Lesson, "id">;

export type LessonProgress = Pick<Lesson, "id" | "title" | "description"> & {
  completedCount: number;
  totalCount: number;
};

export interface ILessonRepository {
  getAll(limit: number, offset: number): Promise<Lesson[]>;

  getOne(id: string): Promise<Lesson | null>;
  getOneWithProgress(lessonId: string, userId: string): Promise<LessonProgress | null>;

  create(category: CreateLessonDTO): Promise<Lesson>;
  update(category: Lesson): Promise<Lesson>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;

  createCompleted(data: CompletedLesson): Promise<CompletedLesson>;
  deleteCompleted(data: CompletedLesson): Promise<void>;
}
