import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

import { AUTH_VALIDATION_ERRORS } from "@/shared";

export type AuthError = { field: "email" | "password" | "root"; message: string } | undefined;

export const getAuthError = (e: unknown): AuthError => {
  if (!(e instanceof FirebaseError)) {
    return;
  }

  switch (e.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return { field: "email", message: AUTH_VALIDATION_ERRORS.EMAIL_EXISTS };
    case AuthErrorCodes.INVALID_EMAIL:
      return { field: "email", message: AUTH_VALIDATION_ERRORS.EMAIL_INVALID };
    case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
      return {
        field: "email",
        message: AUTH_VALIDATION_ERRORS.INVALID_LOGIN_CREDENTIALS,
      };
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return {
        field: "root",
        message: AUTH_VALIDATION_ERRORS.TOO_MANY_ATTEMPTS_TRY_LATER,
      };
    default:
      return undefined;
  }
};
