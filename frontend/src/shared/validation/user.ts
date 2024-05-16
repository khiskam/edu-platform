import { object, ref, string } from "yup";

export const AUTH_VALIDATION_ERRORS = {
  EMAIL_REQUIRED: "Поле Email обязательно для заполнения",
  EMAIL_INVALID: "Неверный формат email",
  PASSWORD_REQUIRED: "Поле Пароль обязательно для заполнения",
  PASSWORD_MIN_LENGTH: "Минимальное кол-во символов: 6",
  CONFIRM_PASSWORD_REQUIRED: "Поле Подтвердить пароль обязательно для заполнения",
  CONFIRM_PASSWORD_UNMATCH: "Пароли не совпадают",
  INVALID_EMAIL: "Неверный формат email",
  EMAIL_EXISTS: "Пользователь с таким email уже существует",
  INVALID_LOGIN_CREDENTIALS: "Неверный логин или пароль",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Выполнено слишком много попыток, попробуйте позже",
};

export const signInSchema = object({
  email: string().trim().required(AUTH_VALIDATION_ERRORS.EMAIL_REQUIRED),
  password: string().trim().required(AUTH_VALIDATION_ERRORS.PASSWORD_REQUIRED),
});

export const signUpSchema = object({
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
