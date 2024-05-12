import { InferType, object, string } from "yup";

export const schema = object({
  name: string()
    .trim()
    .required("Поле наименование обязательно для заполнения"),
});

export type FormData = InferType<typeof schema>;
