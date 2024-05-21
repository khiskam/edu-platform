import { UseFormSetError } from "react-hook-form";

import { LessonApi } from "@/shared/api";
import { LessonData } from "@/shared/types";

import { getCategoryError } from "../utils";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = LessonApi.useCreateMutation();

  const onSubmit =
    (setError: UseFormSetError<LessonData>, reset?: (data?: Partial<LessonData>) => void) =>
    async (data: LessonData) => {
      try {
        await mutateAsync(data);
        reset?.({ layout: "" });
      } catch (e) {
        const errors = getCategoryError<LessonData>(e);
        if (errors) {
          errors.forEach((item) => {
            setError(item.field, { message: item.message });
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
