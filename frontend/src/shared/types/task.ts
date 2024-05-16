import { InferType } from "yup";

import { taskSchema } from "../validation";
import { Id } from "./id";

export type TaskData = InferType<typeof taskSchema>;

export type Task = Id & TaskData;
