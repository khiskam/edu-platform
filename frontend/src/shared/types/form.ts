import { UseControllerProps } from "react-hook-form";

export type FormFieldProps<T extends object> = {
  label?: React.ReactNode;
  placeholder?: string;

  control: UseControllerProps<T>;
  onChange?: React.ChangeEventHandler;
};

export type FormProps = {
  onSuccess: (success: boolean) => void;
  button: string;
};
