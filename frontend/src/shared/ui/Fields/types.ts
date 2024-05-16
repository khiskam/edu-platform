import { ChangeEvent } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type FormFieldProps<T extends FieldValues> = {
  label?: React.ReactNode;
  placeholder?: string;

  control: UseControllerProps<T>;
  onChange?: (e?: ChangeEvent) => void;
};
