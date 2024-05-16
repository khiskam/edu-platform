import { SelectProps } from "antd";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "@/shared/types";

export type TextFieldProps<T extends FieldValues> = FormFieldProps<T> & {
  options: SelectProps["options"];
};
