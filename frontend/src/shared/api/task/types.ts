import { Task } from "@/shared/types";

export type TaskAnswers = Pick<Task, "id" | "title" | "description" | "lessonId"> & {
  answers: string[];
  correctAnswers: string[];
};

export type TaskAnswersResponse = {
  task: TaskAnswers;
};

export type TaskProgress = {
  id: string;
  title: string;
  isCompleted: boolean;
  answers: string[];
  description: string;
};

export type TasksProgressResponse = {
  tasks: TaskProgress[];
  totalCount: number;
};

export type TaskProgressResponse = {
  task: TaskProgress & { answers: string[] };
};

export type TasksResponse = {
  tasks: Task[];
  totalCount: number;
};

export type TaskResponse = {
  task: Task;
};
