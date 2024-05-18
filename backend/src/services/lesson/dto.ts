import { CompletedLesson, Lesson } from "@domain/lesson";

export type LessonDTO = Omit<Lesson, "id">;

export type LessonWithCompleted = Lesson & {
  completedLesson: CompletedLesson[];
};

export type Progress = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
};
