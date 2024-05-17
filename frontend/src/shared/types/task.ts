import { InferType } from "yup";

import { taskSchema, taskSelectSchema } from "../validation";
import { Id } from "./id";

export type TaskData = InferType<typeof taskSchema>;
export type TaskSelectData = InferType<typeof taskSelectSchema>;

export type Task = Id & TaskData;
