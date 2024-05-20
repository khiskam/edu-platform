import { Task, TaskData } from "@/shared/types";

export const taskToTaskData = (data: Task): TaskData => {
  const { title, description, lessonId, answers } = data;

  return { title, description, lessonId, answers };
};
