import { UseFormSetError } from "react-hook-form";

import { LessonApi } from "@/shared/api";
import { LessonData } from "@/shared/types";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = LessonApi.useUpdateMutation();

  const onSubmit = (setError: UseFormSetError<LessonData>) => async (data: LessonData) => {
    try {
      await mutateAsync({ id, ...data });
    } catch {
      setError("description", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};
