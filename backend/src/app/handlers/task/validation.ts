import { array, object, string } from "yup";

export const taskSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  lessonId: string().required("Поле категория обязательна для заполнения"),
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .min(2, "Минимальное количество варинтов ответа 2")
    .max(6, "Максимальное количесвто ответов 6"),

  correctAnswers: array()
    .required("Поле Правильные ответы обязательно для заполнения")
    .min(1, "Минимальное количество варинтов ответа 1")
    .max(6, "Максимальное количесвто ответов 6"),
});

export const createTaskSchema = object({
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .min(1, "Минимальное количество варинтов ответа 1")
    .max(6, "Максимальное количесвто ответов 6"),
});
