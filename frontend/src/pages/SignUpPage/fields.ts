import { InferType, object, ref, string } from "yup";

import { FormFieldsData } from "@/shared/types";
import { getFieldsData } from "@/shared/utils";

export const schema = object({
  email: string()
    .trim()
    .required("Поле Email обязательно для заполнения")
    .email("Неверный формат email"),
  password: string()
    .trim()
    .required("Поле Пароль обязательно для заполнения")
    .min(6, "Минимальное кол-во символов: 6"),
  confirmPassword: string()
    .trim()
    .required("Поле Подтвердить пароль обязательно для заполнения")
    .oneOf([ref("password")], "Пароли не совпадают"),
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
