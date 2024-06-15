import { Image } from "@/shared/types";

export type QueryParams = {
  page?: string | null;
  limit?: string | null;
  q?: string | null;
};

export type ImageResponse = {
  image: Image;
};

export type Answer = {
  answers: string[];
};

export type CompletedLessonResponse = {
  lesson: { lessonId: string; userId: string };
};

export type CompletedTaskResponse = {
  task: { taskId: string; userId: string };
};

export type StatisticsResponse = {
  statistics: {
    usersCount: number;
    categoriesCount: number;
    lessonsCount: number;
    tasksCount: number;
  };
};
