import { UseFormSetError } from "react-hook-form";

import { getApiError, TaskApi } from "@/shared/api";
import { getTaskData, toTaskData } from "@/shared/types";
import { TaskDataWithAnswers } from "@/shared/types/task";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useUpdateMutation();

  const onSubmit =
    (
      setError: UseFormSetError<TaskDataWithAnswers>,
      reset?: (data?: Partial<TaskDataWithAnswers>) => void
    ) =>
    async (data: TaskDataWithAnswers) => {
      const taskData = toTaskData(data);

      try {
        const response = await mutateAsync({ id, ...taskData });

        reset?.(getTaskData(response.data.task));
      } catch (e) {
        const errors = getApiError<TaskDataWithAnswers>(e);
        if (errors) {
          errors.forEach((item) => {
            if (item.field in data) {
              console.log(errors);
              setError(item.field, { message: item.message });
            }
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
