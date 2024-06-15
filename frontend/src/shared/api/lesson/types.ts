import { Lesson } from "@/shared/types";

export type LessonProgress = {
  id: string;
  title: string;
  description: string;
  layout: string;
  completedCount: number;
  totalCount: number;
  isCompleted: boolean;
};

export type LessonsResponse = {
  lessons: Lesson[];
  totalCount: number;
};

export type LessonResponse = {
  lesson: Lesson;
};

export type LessonProgressResponse = {
  lesson: LessonProgress;
};

export type LessonsProgressResponse = {
  lessons: LessonProgress[];
  totalCount: number;
};
