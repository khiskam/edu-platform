import { CompletedLesson, Lesson, LessonProgress } from "@domain/lesson";
import { Task, TaskProgress } from "@domain/task";

export type LessonData = Omit<Lesson, "id">;

export type CreateLessonDTO = LessonData & { images: string[] };
export type UpdateLessonDTO = Lesson & { images: string[] };

export type CreateCompletedLessonDTO = Omit<CompletedLesson, "completedAt">;

export interface ILessonRepository {
  getOne(lessonId: string): Promise<Lesson | null>;

  create(lesson: CreateLessonDTO): Promise<Lesson>;
  update(lesson: UpdateLessonDTO): Promise<Lesson>;
  delete(lessonId: string): Promise<void>;
}

export interface ILessonProgressRepository {
  getOneProgress(lessonId: string, userId: string): Promise<LessonProgress | null>;
}

export interface ITasksByLessonRepository {
  getAllTasks(lessonId: string, limit: number, offset: number, search?: string): Promise<Task[]>;

  getAllTasksProgress(
    lessonId: string,
    userId: string,
    limit: number,
    offset: number,
    search?: string
  ): Promise<TaskProgress[]>;

  getTasksCount(lessonId: string, search?: string): Promise<number>;
}

export interface ICompletedLessonRepository {
  createCompleted(data: CreateCompletedLessonDTO): Promise<CompletedLesson>;
}
