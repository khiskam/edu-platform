import { UseFormSetError } from "react-hook-form";

import { getApiError, LessonApi } from "@/shared/api";
import { LessonData } from "@/shared/types";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = LessonApi.useCreateMutation();

  const onSubmit =
    (setError: UseFormSetError<LessonData>, reset?: (data?: Partial<LessonData>) => void) =>
    async (data: LessonData) => {
      try {
        await mutateAsync(data);
        reset?.({ layout: "" });
      } catch (e) {
        const errors = getApiError<LessonData>(e);
        if (errors) {
          errors.forEach((item) => {
            setError(item.field, { message: item.message });
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
