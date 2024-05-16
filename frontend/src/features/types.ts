import { FieldValues, UseFormSetError } from "react-hook-form";

export type FormProps<T extends FieldValues = FieldValues> = {
  onSubmit: (setError: UseFormSetError<T>) => (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
};
