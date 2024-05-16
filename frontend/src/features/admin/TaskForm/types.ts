import {
  Control,
  FieldArray,
  FieldValues,
  UseControllerProps,
  UseFieldArrayProps,
} from "react-hook-form";

import { Category, FormProps } from "@/shared/types";
import { TaskData } from "@/shared/validation";

export type TaskFormProps = FormProps<TaskData> & {
  categories?: Category[];
};

export type CreateAnswerFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  name: UseFieldArrayProps<T>["name"];
  checkboxName: (idx: number) => UseControllerProps<T>["name"];
  textName: (idx: number) => UseControllerProps<T>["name"];

  initValue: FieldArray<T>;
  rootError?: string;

  label: string;
  placeholder: string;
};
