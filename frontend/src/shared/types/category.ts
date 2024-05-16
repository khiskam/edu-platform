import { InferType } from "yup";

import { categorySchema } from "../validation";
import { Id } from "./id";

export type CategoryData = InferType<typeof categorySchema>;

export type Category = Id & CategoryData;
