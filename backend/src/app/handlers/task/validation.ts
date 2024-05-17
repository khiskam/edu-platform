import { array, boolean, object, string } from "yup";

export const taskSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  lessonId: string().required("Поле категория обязательна для заполнения"),
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .min(2, "Минимальное количество варинтов ответа 2")
    .max(6, "Максимальное количесвто ответов 6")
    .of(
      object({
        isCorrect: boolean().optional(),
        value: string().required("Поле обязательно для заполнения").trim(),
      })
    )
    .test("correctAnswer", (value, ctx) => {
      if (value.length < 2) {
        return true;
      }

      const result = value.find((item) => item.isCorrect);

      if (!result) {
        return ctx.createError({
          message: "Должен быть минимум один верный ответ",
          path: "answers",
        });
      }

      return true;
    }),
});
