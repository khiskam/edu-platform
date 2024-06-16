import { UseFormSetError } from "react-hook-form";

import { getApiError, TaskApi } from "@/shared/api";
import { toTaskData } from "@/shared/types";
import { TaskDataWithAnswers } from "@/shared/types/task";

export const useFormSubmit = (defaultValues: Partial<TaskDataWithAnswers>) => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useCreateMutation();

  const onSubmit =
    (
      setError: UseFormSetError<TaskDataWithAnswers>,
      reset?: (data?: Partial<TaskDataWithAnswers>) => void
    ) =>
    async (data: TaskDataWithAnswers) => {
      const taskData = toTaskData(data);

      try {
        await mutateAsync(taskData);
        reset?.(defaultValues);
      } catch (e) {
        const errors = getApiError<TaskDataWithAnswers>(e);
        if (errors) {
          errors.forEach((item) => {
            setError(item.field, { message: item.message });
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
