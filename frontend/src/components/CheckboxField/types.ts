import { FormFieldProps } from "@/shared/types";

export type CheckboxFieldProps<T extends object> = Omit<FormFieldProps<T>, "placeholder">;
