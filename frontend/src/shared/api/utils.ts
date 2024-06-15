import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export type ApiError<T extends FieldValues> = { field: keyof T; message: string }[] | undefined;

export const getApiError = <T extends FieldValues>(e: unknown): ApiError<T> => {
  if (e instanceof AxiosError) {
    const errors: ApiError<T> = [];

    const data: T = e.response?.data.errors;
    let key: keyof T;

    for (key in data) {
      if (data[key]) {
        errors.push({ field: key, message: data[key] });
      }
    }

    return errors;
  }

  return undefined;
};
