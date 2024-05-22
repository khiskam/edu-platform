import { InferType } from "yup";

import { answersSchema, taskSchema } from "../validation";
import { Id } from "./id";

export type TaskData = InferType<typeof taskSchema>;
export type AnswerData = InferType<typeof answersSchema>;

export type Task = Id & TaskData;
