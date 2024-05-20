import { UseFormSetError } from "react-hook-form";

import { CategoryApi } from "@/shared/api";
import { CategoryData } from "@/shared/types";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = CategoryApi.useUpdateMutation();

  const onSubmit = (setError: UseFormSetError<CategoryData>) => async (data: CategoryData) => {
    try {
      await mutateAsync({ id, ...data });
    } catch {
      setError("name", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};
