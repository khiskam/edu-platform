import { UseFormSetError } from "react-hook-form";

import { getApiError, TaskApi, TaskWithProgress } from "@/shared/api";
import { Answer } from "@/shared/api/types";
import { CategoryData } from "@/shared/types";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useCreateAnswerMutation();

  const onSubmit =
    (setError: UseFormSetError<TaskWithProgress>, reset?: (data?: CategoryData) => void) =>
    async (data: Answer) => {
      try {
        await mutateAsync(data);
      } catch (e) {
        reset?.();
        const errors = getApiError<TaskWithProgress>(e);

        if (errors) {
          errors.forEach((item) => {
            setError(item.field, { message: item.message });
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
