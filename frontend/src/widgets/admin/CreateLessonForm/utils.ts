import { UseFormSetError } from "react-hook-form";

import { LessonApi } from "@/shared/api";
import { LessonData } from "@/shared/types";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = LessonApi.useCreateMutation();

  const onSubmit = (setError: UseFormSetError<LessonData>) => async (data: LessonData) => {
    try {
      await mutateAsync(data);
    } catch {
      setError("description", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};
