export type Lesson = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  layout: string;
};

export type CompletedLesson = {
  userId: string;
  lessonId: string;
  completedAt: Date;
};

export type LessonProgress = Pick<Lesson, "id" | "title" | "description" | "layout"> & {
  completedCount: number;
  totalCount: number;
  isCompleted: boolean;
};

export type LessonImage = {
  id: string;
  path: string;
  size: number;
  contentType: string;
  fileName: string;
  lessonId: string | null;
};
