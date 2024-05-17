export type Lesson = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  layout: string;
};

export type LessonKeys = keyof Lesson;

export type CompletedLesson = {
  userId: string;
  lessonId: string;
};

export type CompletedLessonKeys = keyof CompletedLesson;
