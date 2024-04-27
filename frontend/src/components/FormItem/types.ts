import { UseControllerProps, UseFormTrigger } from "react-hook-form";

import { FieldProps } from "@/shared/types";

export type FormItemProps<T extends Record<string, string>> = {
  controller: UseControllerProps<T>;
  trigger?: {
    fn: UseFormTrigger<T>;
    name: keyof T;
  };
} & FieldProps;
