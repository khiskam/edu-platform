import { FormFieldProps } from "@/shared/types";

export type TextEditorFieldProps<T extends object> = Omit<
  FormFieldProps<T>,
  "onChange" | "placeholder"
> & {
  onInit?: () => void;
};
