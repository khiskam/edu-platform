import { UseFormSetError } from "react-hook-form";

import { TaskApi, TaskData } from "@/shared";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useCreateMutation();

  const onSubmit = (setError: UseFormSetError<TaskData>) => async (data: TaskData) => {
    try {
      await mutateAsync(data);
    } catch {
      setError("description", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};
