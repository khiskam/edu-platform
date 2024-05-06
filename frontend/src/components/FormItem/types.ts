import { UseControllerProps } from "react-hook-form";

import { FieldProps } from "@/shared/types";

export type FormItemProps<T extends Record<string, string>> = {
  controller: UseControllerProps<T>;
  onChange?: React.ChangeEventHandler;
} & FieldProps;
