import {
  Control,
  FieldArray,
  FieldValues,
  UseControllerProps,
  UseFieldArrayProps,
} from "react-hook-form";

export type AnswerFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  name: UseFieldArrayProps<T>["name"];
  checkboxName: (idx: number) => UseControllerProps<T>["name"];
  textName: (idx: number) => UseControllerProps<T>["name"];

  initValue: FieldArray<T>;
  rootError?: string;

  label: string;
  placeholder: string;
};
