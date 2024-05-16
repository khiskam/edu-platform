import { object, string } from "yup";

export const lessonSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  category_id: string().required("Поле категория обязательна для заполнения"),
  layout: string().trim().required("Поле Разметка обязательно для заполнения"),
});
