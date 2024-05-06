import { InferType, object, string } from "yup";

import { AUTH_VALIDATION_ERRORS } from "@/shared/constants";
import { FormFieldsData } from "@/shared/types";
import { getFieldsData } from "@/shared/utils";

export const schema = object({
  email: string().trim().required(AUTH_VALIDATION_ERRORS.EMAIL_REQUIRED),
  password: string().trim().required(AUTH_VALIDATION_ERRORS.PASSWORD_REQUIRED),
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
