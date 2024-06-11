import { object, string } from "yup";

export const registerUserSchema = object({
  firstName: string().required("Поле Имя обазательно для заполнения"),
  lastName: string().required("Поле Фамилия обазательно для заполнения"),
});

export const updateUserSchema = object({
  firstName: string().required("Поле Имя обазательно для заполнения"),
  lastName: string().required("Поле Фамилия обазательно для заполнения"),
});
