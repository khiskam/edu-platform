import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "@/shared/types";

export type TextFieldProps<T extends FieldValues> = FormFieldProps<T> & {
  type: "textarea" | "input" | "password";
};
