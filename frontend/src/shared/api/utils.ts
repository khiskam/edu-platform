import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

import { CategoryData } from "@/shared/types";

import { TaskWithAnswersReponse } from "../api";
import { Task } from "../types";

export const getTask = (data: TaskWithAnswersReponse | undefined): undefined | Task => {
  if (!data?.task) {
    return undefined;
  }

  const { id, lessonId, title, description, answers, correctAnswers } = data.task;

  const variants: Task["answers"] = answers.map((item) => ({
    value: item,
    isCorrect: correctAnswers.includes(item),
  }));

  return { id, lessonId, title, description, answers: variants };
};

export type ApiError<T extends FieldValues> = { field: keyof T; message: string }[] | undefined;

export const getApiError = <T extends FieldValues>(e: unknown): ApiError<T> => {
  if (e instanceof AxiosError) {
    const errors: ApiError<T> = [];

    const category: CategoryData = e.response?.data.errors;
    let key: keyof CategoryData;

    for (key in category) {
      if (category[key]) {
        errors.push({ field: key, message: category[key] });
      }
    }

    return errors;
  }

  return undefined;
};
