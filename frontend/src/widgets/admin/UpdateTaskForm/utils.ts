import { UseFormSetError } from "react-hook-form";

import { TaskApi } from "@/shared/api";
import { TaskData } from "@/shared/types";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = TaskApi.useUpdateMutation();

  const onSubmit = (setError: UseFormSetError<TaskData>) => async (data: TaskData) => {
    try {
      await mutateAsync({ id, ...data });
    } catch {
      setError("description", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};
