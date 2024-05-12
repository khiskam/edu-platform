import { InferType, object, string } from "yup";

import { AUTH_VALIDATION_ERRORS } from "@/shared/constants";

export const schema = object({
  email: string().trim().required(AUTH_VALIDATION_ERRORS.EMAIL_REQUIRED),
  password: string().trim().required(AUTH_VALIDATION_ERRORS.PASSWORD_REQUIRED),
});

export type FormData = InferType<typeof schema>;
