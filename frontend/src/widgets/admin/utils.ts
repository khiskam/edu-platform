import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

import { CategoryData } from "@/shared/types";

export type ApiError<T extends FieldValues> = { field: keyof T; message: string }[] | undefined;

export const getCategoryError = <T extends FieldValues>(e: unknown): ApiError<T> => {
  if (e instanceof AxiosError) {
    const errors: ApiError<T> = [];

    const category: CategoryData = e.response?.data.errors;
    let key: keyof CategoryData;

    for (key in category) {
      if (category[key]) {
        errors.push({ field: key, message: category[key] });
      }
    }

    return errors;
  }

  return undefined;
};
