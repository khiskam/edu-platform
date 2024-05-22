import { UseFormSetError } from "react-hook-form";

import { getApiError, TaskApi } from "@/shared/api";
import { TaskData } from "@/shared/types";

export const useFormSubmit = (defaultValues: Partial<TaskData>) => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useCreateMutation();

  const onSubmit =
    (setError: UseFormSetError<TaskData>, reset?: (data?: Partial<TaskData>) => void) =>
    async (data: TaskData) => {
      try {
        await mutateAsync(data);
        reset?.(defaultValues);
      } catch (e) {
        const errors = getApiError<TaskData>(e);
        if (errors) {
          errors.forEach((item) => {
            setError(item.field, { message: item.message });
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
