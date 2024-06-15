import { Category, Image, Lesson, Task, User } from "@/shared/types";

export type CategoriesResponse = {
  categories: Category[];
  totalCount: number;
};

export type CategoryResponse = {
  category: Category;
};

export type CategoryWithProgress = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
};

export type CategoriesWithProgressResponse = {
  categories: CategoryWithProgress[];
  totalCount: number;
};

export type CategoryWithProgressResponse = {
  category: CategoryWithProgress;
};

export type LessonsResponse = {
  lessons: Lesson[];
  totalCount: number;
};

export type LessonResponse = {
  lesson: Lesson;
};

export type LessonWithProgress = {
  id: string;
  title: string;
  description: string;
  layout: string;
  completedCount: number;
  totalCount: number;
  isCompleted: boolean;
};

export type LessonsWithProgressResponse = {
  lessons: LessonWithProgress[];
  totalCount: number;
};

export type LessonWithProgressResponse = {
  lesson: LessonWithProgress;
};

export type TaskWithAnswers = Pick<Task, "id" | "title" | "description" | "lessonId"> & {
  answers: string[];
  correctAnswers: string[];
};

export type TaskWithAnswersReponse = {
  task: TaskWithAnswers;
};

export type TaskWithProgress = {
  id: string;
  title: string;
  isCompleted: boolean;
  answers: string[];
  description: string;
};

export type TasksWithProgressResponse = {
  tasks: TaskWithProgress[];
  totalCount: number;
};

export type TaskWithProgressResponse = {
  task: TaskWithProgress & { answers: string[] };
};

export type TasksResponse = {
  tasks: Task[];
  totalCount: number;
};

export type TaskResponse = {
  task: Task;
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

export type UserDetailsResponse = {
  user: User["user"] & {
    statistics: { lessonsCompleted: number; tasksCompleted: number };
  } & { monthlyActions: { date: string; lessonsCompleted: number; tasksCompleted: number }[] };
};
