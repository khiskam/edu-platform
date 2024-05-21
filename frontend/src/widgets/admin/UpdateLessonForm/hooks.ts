import { UseFormSetError } from "react-hook-form";

import { LessonApi } from "@/shared/api";
import { LessonData } from "@/shared/types";

import { getCategoryError } from "../utils";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = LessonApi.useUpdateMutation();

  const onSubmit =
    (setError: UseFormSetError<LessonData>, reset?: (data?: LessonData) => void) =>
    async (data: LessonData) => {
      try {
        const response = await mutateAsync({ id, ...data });

        reset?.(response.data.lesson);
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
