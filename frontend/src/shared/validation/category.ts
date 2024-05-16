import { object, string } from "yup";

export const categorySchema = object({
  name: string().trim().required("Поле наименование обязательно для заполнения"),
});
