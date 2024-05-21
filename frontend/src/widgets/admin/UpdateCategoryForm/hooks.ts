import { UseFormSetError } from "react-hook-form";

import { CategoryApi } from "@/shared/api";
import { CategoryData } from "@/shared/types";

import { getCategoryError } from "../utils";

export const useFormSubmit = (id: string) => {
  const { mutateAsync, isSuccess, isPending } = CategoryApi.useUpdateMutation();

  const onSubmit =
    (setError: UseFormSetError<CategoryData>, reset?: (data?: CategoryData) => void) =>
    async (data: CategoryData) => {
      try {
        const category = await mutateAsync({ id, ...data });

        reset?.(category.data.category);
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
