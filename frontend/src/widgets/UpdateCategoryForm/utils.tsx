import { useMutation, useQuery } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";

import { CategoryData } from "@/shared/validation";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: async (data: CategoryData) => {
      return data;
    },
  });

  const onSubmit = (setError: UseFormSetError<CategoryData>) => async (data: CategoryData) => {
    try {
      await mutateAsync(data);
    } catch {
      setError("name", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};

export const useLoadDataQuery = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data: CategoryData = { name: "example" };
      return data;
    },
  });
};
