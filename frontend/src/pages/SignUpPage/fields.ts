import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { InferType, object, ref, string } from "yup";

import { AUTH_VALIDATION_ERRORS } from "@/shared/constants";
import { ApiError, FormFieldsData } from "@/shared/types";
import { getFieldsData } from "@/shared/utils";

export const schema = object({
  email: string()
    .trim()
    .required(AUTH_VALIDATION_ERRORS.EMAIL_REQUIRED)
    .email(AUTH_VALIDATION_ERRORS.EMAIL_INVALID),
  password: string()
    .trim()
    .required(AUTH_VALIDATION_ERRORS.PASSWORD_REQUIRED)
    .min(6, AUTH_VALIDATION_ERRORS.PASSWORD_MIN_LENGTH),
  confirmPassword: string()
    .trim()
    .required(AUTH_VALIDATION_ERRORS.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([ref("password")], AUTH_VALIDATION_ERRORS.CONFIRM_PASSWORD_UNMATCH),
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

export const getError = (e: unknown): ApiError<FormData> => {
  if (!(e instanceof FirebaseError)) {
    return;
  }

  if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
    return { field: "email", message: AUTH_VALIDATION_ERRORS.EMAIL_EXISTS };
  } else if (e.code === AuthErrorCodes.INVALID_EMAIL) {
    return { field: "email", message: AUTH_VALIDATION_ERRORS.EMAIL_INVALID };
  }
};
