import { InferType, object, ref, string } from "yup";

import { AUTH_VALIDATION_ERRORS } from "@/shared/constants";

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
