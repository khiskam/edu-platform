import { array, boolean, object, string } from "yup";

export const taskSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  lessonId: string().required("Поле категория обязательна для заполнения"),
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

export const answersSchema = object({
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .of(
      object({
        isCorrect: boolean().optional(),
        value: string().required("Поле обязательно для заполнения"),
      })
    )
    .required("Необходимо выбрать минимум один правильный ответ")
    .min(1)
    .test("correctAnswer", (value, ctx) => {
      const result = value?.find((item) => item.isCorrect);

      if (!result) {
        return ctx.createError({
          message: "Должен быть минимум один верный ответ",
          path: "answers",
        });
      }

      return true;
    }),
});
