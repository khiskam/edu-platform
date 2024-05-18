import { LessonDTO, LessonWithCompleted } from "./dto";
import { CompletedLesson, Lesson } from "@domain/lesson";

export interface ILessonRepository {
  getAll(limit: number, offset: number): Promise<Lesson[]>;
  getOne(id: string): Promise<Lesson | null>;
  getOneCompleted(data: CompletedLesson): Promise<LessonWithCompleted | null>;
  create(category: LessonDTO): Promise<Lesson>;
  update(category: Lesson): Promise<Lesson>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;

  createCompleted(data: CompletedLesson): Promise<CompletedLesson>;
  deleteCompleted(data: CompletedLesson): Promise<void>;
}
