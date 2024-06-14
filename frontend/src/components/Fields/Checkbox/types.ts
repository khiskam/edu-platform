import { CheckboxProps } from "antd/es/checkbox";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "../types";

export type CheckboxFieldProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "placeholder" | "onChange"
> & {
  classname?: CheckboxProps["className"];
};
