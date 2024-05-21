import { UseFormSetError } from "react-hook-form";

import { CategoryApi } from "@/shared/api";
import { CategoryData } from "@/shared/types";

import { getCategoryError } from "../utils";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = CategoryApi.useCreateMutation();

  const onSubmit =
    (setError: UseFormSetError<CategoryData>, reset?: (data?: CategoryData) => void) =>
    async (category: CategoryData) => {
      try {
        await mutateAsync(category);
        reset?.();
      } catch (e) {
        const errors = getCategoryError<CategoryData>(e);

        if (errors) {
          errors.forEach((item) => {
            setError(item.field, { message: item.message });
          });
        }
      }
    };

  return { isLoading: isPending, isSuccess, onSubmit };
};
