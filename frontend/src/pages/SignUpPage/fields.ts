import { InferType, object, ref, string } from "yup";

import { FormFieldsData } from "@/shared/types";
import { getFieldsData } from "@/shared/utils";

export const errorsMap = {
  EMAIL_REQUIRED: "Поле Email обязательно для заполнения",
  EMAIL_INVALID: "Неверный формат email",
  EMAIL_EXISTS: "Пользователь с таким email уже существует",
  PASSWORD_REQUIRED: "Поле Пароль обязательно для заполнения",
  PASSWORD_MIN_LENGTH: "Минимальное кол-во символов: 6",
  CREDENTIALS_INVALID: "Неверный логин или пароль",
  CONFIRM_PASSWORD_REQUIRED:
    "Поле Подтвердить пароль обязательно для заполнения",
  CONFIRM_PASSWORD_UNMATCH: "Пароли не совпадают",
};

export const schema = object({
  email: string()
    .trim()
    .required(errorsMap.EMAIL_REQUIRED)
    .email(errorsMap.EMAIL_INVALID),
  password: string()
    .trim()
    .required(errorsMap.PASSWORD_REQUIRED)
    .min(6, errorsMap.PASSWORD_MIN_LENGTH),
  confirmPassword: string()
    .trim()
    .required(errorsMap.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref("password")], errorsMap.CONFIRM_PASSWORD_UNMATCH),
});

export type FormData = InferType<typeof schema>;

const inputsData: FormFieldsData<FormData> = {
  email: { label: "Email", placeholder: "Email", type: "input" },
  password: {
    label: "Пароль",
    placeholder: "Пароль",
    type: "password",
    revalidate: "confirmPassword",
  },
  confirmPassword: {
    label: "Подтвердить пароль",
    placeholder: "Подтвердить пароль",
    type: "password",
  },
};

export const inputs = getFieldsData<FormData>(inputsData);
