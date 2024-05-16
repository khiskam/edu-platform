import { CheckboxProps } from "antd";
import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "@/shared/types";

export type CheckboxFieldProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "placeholder" | "onChange"
> & {
  classname?: CheckboxProps["className"];
};
