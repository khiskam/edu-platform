import { InferType } from "yup";

import { lessonSchema } from "../validation";
import { Id } from "./id";

export type LessonData = InferType<typeof lessonSchema>;

export type Lesson = Id & LessonData;
