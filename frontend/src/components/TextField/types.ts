import { FormFieldProps } from "@/shared/types";

export type TextFieldProps<T extends object> = FormFieldProps<T> & {
  type: "textarea" | "input" | "password";
};
