import { ChangeEvent } from "react";
import { FieldValues, UseControllerProps, UseFormSetError } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
  label?: React.ReactNode;
  placeholder?: string;

  control: UseControllerProps<T>;
  onChange?: (e?: ChangeEvent) => void;
};

export type FormWidgetProps = {
  onSuccess?: (success: boolean) => void;
};

export type FormProps<T extends FieldValues = FieldValues> = {
  onSubmit: (setError: UseFormSetError<T>) => (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
};
