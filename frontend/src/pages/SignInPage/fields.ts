import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { InferType, object, string } from "yup";

import { AUTH_VALIDATION_ERRORS } from "@/shared/constants";
import { ApiError, FormFieldsData } from "@/shared/types";
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

export const getError = (e: unknown): ApiError<FormData> => {
  if (!(e instanceof FirebaseError)) {
    return;
  }

  if (
    e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS ||
    e.code === AuthErrorCodes.INVALID_EMAIL
  ) {
    return {
      field: "root",
      message: AUTH_VALIDATION_ERRORS.INVALID_LOGIN_CREDENTIALS,
    };
  } else if (e.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
    return {
      field: "root",
      message: AUTH_VALIDATION_ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER,
    };
  }
};

export const inputs = getFieldsData<FormData>(inputsData);
