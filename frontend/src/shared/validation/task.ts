import { array, object, string } from "yup";

export const taskSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  lessonId: string().required("Поле категория обязательна для заполнения"),
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .of(string())
    .min(2, "Количество ответов должно быть минимум 2"),
  correctAnswers: array()
    .required("Поле Ответы обязательно для заполнения")
    .of(string().required()),
});

export const answersSchema = object({
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .min(1, "Поле Ответы обязательно для заполнения")
    .of(string().required()),
});
