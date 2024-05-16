import { Lesson, LessonData } from "@/shared";

export const lessonToLessonData = (data: Lesson): LessonData => {
  const { title, description, category_id, layout } = data;

  return { title, description, category_id, layout };
};
