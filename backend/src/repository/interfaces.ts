import { Category } from "@domain/category";
import { Image } from "@domain/image";
import { CompletedLesson, Lesson } from "@domain/lesson";
import { CompletedTask, Task } from "@domain/task";
import { User } from "@domain/user";

export type CreateCategoryDTO = Omit<Category, "id">;

export type CategoryProgress = Pick<Category, "id" | "name"> & {
  completedCount: number;
  totalCount: number;
};

export interface ICategoryRepository {
  getAll(limit: number, offset: number): Promise<Category[]>;
  getAllWithProgress(userId: string, pageSize: number, page: number): Promise<CategoryProgress[]>;
  getAllLessonsByCategoryId(categoryId: string, limit: number, offset: number): Promise<Lesson[]>;
  getAllLessonsByCategoryIdWithProgress(
    categoryId: string,
    userId: string,
    limit: number,
    offset: number
  ): Promise<LessonProgress[]>;

  getOne(categoryId: string): Promise<Category | null>;
  getOneWithProgress(categoryId: string, userId: string): Promise<CategoryProgress | null>;

  create(category: CreateCategoryDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(categoryId: string): Promise<void>;

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

export type CreateLessonDTO = Omit<Lesson, "id"> & { images: string[] };
export type UpdateLessonDTO = Lesson & { images: string[] };

export type LessonProgress = Pick<Lesson, "id" | "title" | "description" | "layout"> & {
  completedCount: number;
  totalCount: number;
  isCompleted: boolean;
};

export type TaskWithProgress = Pick<Task, "id" | "title" | "answers" | "description"> & {
  isCompleted: boolean;
};

export interface ILessonRepository {
  getAllTasksByLessonId(lessonId: string, limit: number, offset: number): Promise<Task[]>;
  getAllTasksByLessonIdWithProgress(
    lessonId: string,
    userId: string,
    limit: number,
    offset: number
  ): Promise<TaskWithProgress[]>;

  getOne(lessonId: string): Promise<Lesson | null>;
  getOneWithProgress(lessonId: string, userId: string): Promise<LessonProgress | null>;

  create(lesson: CreateLessonDTO): Promise<Lesson>;
  update(lesson: UpdateLessonDTO): Promise<Lesson>;
  delete(lessonId: string): Promise<void>;

  deleteCompletedLessonsByLessonId(lessonId: string): Promise<void>;

  count(): Promise<number>;
  tasksCountByLessonId(lessonId: string): Promise<number>;

  createCompleted(data: CompletedLesson): Promise<CompletedLesson>;
}

export type CreateTaskDTO = Omit<Task, "id">;

export interface ITaskRepository {
  getOne(id: string): Promise<Task | null>;
  getOneWithProgress(taskId: string, userId: string): Promise<TaskWithProgress | null>;

  create(task: CreateTaskDTO): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
  deleteCompletedTasksByTaskId(taskId: string): Promise<void>;

  count(): Promise<number>;

  createCompleted(data: CompletedTask): Promise<CompletedTask>;
}

export type CreateImageDTO = Omit<Image, "id" | "lessonId">;

export interface IImageRepository {
  getOne(imageId: string): Promise<Image | null>;
  create(image: CreateImageDTO): Promise<Image>;
}
