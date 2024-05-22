import { UseFormSetError } from "react-hook-form";

import { getApiError, getTask, TaskApi } from "@/shared/api";
import { TaskData } from "@/shared/types";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useUpdateMutation();

  const onSubmit =
    (setError: UseFormSetError<TaskData>, reset?: (data?: Partial<TaskData>) => void) =>
    async (data: TaskData) => {
      try {
        const response = await mutateAsync({ id, ...data });

        const task = getTask(response.data);
        reset?.(task);
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
