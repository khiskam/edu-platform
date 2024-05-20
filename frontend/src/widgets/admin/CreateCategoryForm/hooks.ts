import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

import { CategoryApi } from "@/shared/api";
import { Category, CategoryData } from "@/shared/types";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = CategoryApi.useCreateMutation();

  const onSubmit = (setError: UseFormSetError<CategoryData>) => async (category: CategoryData) => {
    try {
      const { data } = await mutateAsync(category);

      console.log(data);
      // console.log(category);
    } catch (e) {
      if (e instanceof AxiosError) {
        const category: Category = e.response?.data.errors;

        let key: keyof Category;

        for (key in category) {
          if (category[key] && key != "id") {
            setError(key, { message: category[key] });
          }
        }
      }
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};
