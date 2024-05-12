import { array, boolean, InferType, object, string } from "yup";

export const schema = object({
  title: string()
    .trim()
    .required("Поле Наименование обязательно для заполнения"),
  description: string()
    .trim()
    .required("Поле Описание обязательно для заполнения"),
  answers: array()
    .of(
      object({
        isCorrect: boolean().optional(),
        value: string().required("Поле обязательно для заполнения"),
      })
    )
    .test("unique", (value, ctx) => {
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

export type FormData = InferType<typeof schema>;
