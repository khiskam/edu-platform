import { InferType } from "yup";

import { categorySchema, lessonSchema, signInSchema, signUpSchema, taskSchema } from "./schemas";

export type CategoryData = InferType<typeof categorySchema>;

export type LessonData = InferType<typeof lessonSchema>;

export type TaskData = InferType<typeof taskSchema>;

export type SignInData = InferType<typeof signInSchema>;

export type SignUpData = InferType<typeof signUpSchema>;
