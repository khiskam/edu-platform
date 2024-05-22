import { Task } from "@domain/task";
import { Lesson } from "@domain/lesson";
import { CreateTaskDTO } from "@repository/interfaces";
import { ENV } from "../env";

export type CreateTask = Pick<Task, "title" | "description" | "lessonId"> & {
  answers: { isCorrect: boolean; value: string }[];
};

export type UpdateTask = Pick<Task, "id" | "title" | "description" | "lessonId"> & {
  answers: { isCorrect: boolean; value: string }[];
};

export const createTaskDTO = (task: CreateTask): CreateTaskDTO => {
  const { title, description, lessonId, answers } = task;

  const variants = answers.map((item) => item.value.trim());
  const correctAnswers = answers.filter((item) => item.isCorrect).map((item) => item.value.trim());

  return { title, description, lessonId, correctAnswers, answers: variants };
};

export const updateTaskDTO = (task: UpdateTask): Task => {
  const { title, description, lessonId, answers, id } = task;

  const variants = answers.map((item) => item.value.trim());
  const correctAnswers = answers.filter((item) => item.isCorrect).map((item) => item.value.trim());

  return { id, title, description, lessonId, correctAnswers, answers: variants };
};

export const checkAnswers = (answers: string[], correctAnswers: string[]) => {
  if (answers.length !== correctAnswers.length) {
    return false;
  }

  let count = 0;

  for (let i = 0; i < correctAnswers.length; ++i) {
    if (answers.includes(correctAnswers[i])) {
      ++count;
    }
  }

  return count === correctAnswers.length;
};

export type CreateLesson = Omit<Lesson, "id">;

export const getImageIdsFromLayout = (layout: string): string[] => {
  const imgTagRegex = /<img\b[^>]*>/gi;

  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  const regex = new RegExp(
    ENV.BASE_URL +
      /\/api\/images\/uploads\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi
        .source
  );

  const imgTags = layout.match(imgTagRegex);

  if (imgTags) {
    return imgTags
      .filter((item) => item.match(regex))
      .flatMap((item) => item.match(uuidRegex)) as string[];
  } else {
    return [];
  }
};