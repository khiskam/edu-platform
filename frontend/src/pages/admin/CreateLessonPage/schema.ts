import { InferType, object, string } from "yup";

export const schema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  layout: string().trim().required("Поле Разметка обязательно для заполнения"),
});

export type FormData = InferType<typeof schema>;
