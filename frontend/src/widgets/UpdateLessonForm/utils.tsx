import { useMutation, useQuery } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";

import { Category } from "@/shared/types";
import { LessonData } from "@/shared/validation";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: async (data: LessonData) => {
      return data;
    },
  });

  const onSubmit = (setError: UseFormSetError<LessonData>) => async (data: LessonData) => {
    try {
      await mutateAsync(data);
    } catch {
      setError("description", { message: "error" });
    }
  };

  return { isLoading: isPending, isSuccess, onSubmit };
};

export const useLoadDataQuery = () => {
  return useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const data: LessonData = {
        title: "title",
        description: "description",
        category_id: "1",
        layout: "<p>layout</p>",
      };
      return data;
    },
  });
};

export const useCategoryDataQuery = () => {
  return useQuery({
    queryKey: ["lesson"],
    queryFn: async () => {
      const data: Category[] = [
        {
          id: "1",
          name: "русский язык",
        },
        {
          id: "2",
          name: "математика",
        },
      ];
      return data;
    },
  });
};
