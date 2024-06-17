import { InferType } from "yup";

import { taskSchema } from "../validation";
import { Id } from "./id";

export type TaskData = {
  title: string;
  description: string;
  lessonId: string;
  answers: string[];
  correctAnswers: string[];
};

export type TaskDataWithAnswers = InferType<typeof taskSchema>;

export type AnswerData = {
  answers: { isCorrect: boolean; value: string }[];
};

export type CompletedAnswerData = { answers: string[] };

export type Task = Id & TaskData;
export type CorrectAnswer = { isCorrect: boolean; value: string };
