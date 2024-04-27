import { InferType, object, string } from "yup";

import { FormFieldsData } from "@/shared/types";
import { getFieldsData } from "@/shared/utils";

export const schema = object({
  email: string().trim().required("Поле Email обязательно для заполнения"),
  password: string().trim().required("Поле Пароль обязательно для заполнения"),
});

export type FormData = InferType<typeof schema>;

const inputsData: FormFieldsData<FormData> = {
  email: { label: "Email", placeholder: "Email", type: "input" },
  password: {
    label: "Пароль",
    placeholder: "Пароль",
    type: "password",
  },
};

export const inputs = getFieldsData<FormData>(inputsData);
