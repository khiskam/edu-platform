import { array, boolean, mixed, object, string } from "yup";

export const categorySchema = object({
  name: string().trim().required("Поле наименование обязательно для заполнения"),
});

export const lessonSchema = object({
  title: string().trim().required("Поле Наименование обязательно для заполнения"),
  description: string().trim().required("Поле Описание обязательно для заполнения"),
  categoryId: string().required("Поле категория обязательна для заполнения"),
  layout: string().trim().required("Поле Разметка обязательно для заполнения"),
});

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

export const createTaskSchema = object({
  answers: array()
    .required("Поле Ответы обязательно для заполнения")
    .min(1, "Минимальное количество варинтов ответа 1")
    .max(6, "Максимальное количесвто ответов 6"),
});

export const imageSchema = object({
  file: mixed<File>()
    .required("Изображение обязательно")
    .test({
      message: "Размер файла не должен превышать 3Мб",
      test: (file, ctx) => {
        if (file.size > 1024 * 1024 * 3) {
          return ctx.createError();
        }

        return true;
      },
    }),
});
