import { UseControllerProps } from "react-hook-form";

export type FormFieldProps = {
  label: React.ReactNode;
  placeholder?: string;
  type: "textarea" | "input" | "password";

  control: UseControllerProps<Record<string, string>>;
  onChange?: React.ChangeEventHandler;
};
