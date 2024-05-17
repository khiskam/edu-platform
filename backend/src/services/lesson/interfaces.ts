import { LessonDTO } from "./dto";
import { CompletedLesson, Lesson } from "@domain/lesson";

export interface ILessonRepository {
  getAll(limit: number, offset: number): Promise<Lesson[]>;
  getOne(id: string): Promise<Lesson | null>;
  create(category: LessonDTO): Promise<Lesson>;
  update(category: Lesson): Promise<Lesson>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}

export interface ICompletedLessonRepository {
  create(data: CompletedLesson): Promise<CompletedLesson>;
  delete(data: CompletedLesson): Promise<void>;
}
