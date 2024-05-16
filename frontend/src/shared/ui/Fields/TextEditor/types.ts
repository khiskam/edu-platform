import { FieldValues } from "react-hook-form";

import { FormFieldProps } from "../types";

export type TextEditorFieldProps<T extends FieldValues> = Omit<
  FormFieldProps<T>,
  "onChange" | "placeholder"
> & { initValue?: string };

export type EditorContainerProps = {
  hide: boolean;
};
