import { Task, TaskData } from "@/shared";

export const taskToTaskData = (data: Task): TaskData => {
  const { title, description, lesson_id, answers } = data;

  return { title, description, lesson_id, answers };
};
