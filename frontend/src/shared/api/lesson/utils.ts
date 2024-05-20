import { Lesson, LessonData } from "@/shared/types";

export const lessonToLessonData = (data: Lesson): LessonData => {
  const { title, description, categoryId, layout } = data;

  return { title, description, categoryId, layout };
};
