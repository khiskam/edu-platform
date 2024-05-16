import { array, boolean, object, ref, string } from "yup";

import { AUTH_VALIDATION_ERRORS } from "@/shared/constants";

export const categorySchema = object({
  name: string().trim().required("Поле наименование обязательно для заполнения"),
});

export const lessonSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  category_id: string().required("Поле категория обязательна для заполнения"),
  layout: string().trim().required("Поле Разметка обязательно для заполнения"),
});

export const taskSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  category_id: string().required("Поле категория обязательна для заполнения"),
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .of(
      object({
        isCorrect: boolean().optional(),
        value: string().required("Поле обязательно для заполнения"),
      })
    )
    .test("correctAnswer", (value, ctx) => {
      const result = value?.find((item) => item.isCorrect);

      if (!result) {
        return ctx.createError({
          message: "Должен быть минимум один верный ответ",
          path: "answers.root",
        });
      }

      return true;
    }),
});

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
