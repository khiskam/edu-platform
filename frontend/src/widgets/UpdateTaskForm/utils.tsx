import { useMutation, useQuery } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";

import { Category } from "@/shared/types";
import { TaskData } from "@/shared/validation";

export const useFormSubmit = () => {
  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: async (data: TaskData) => {
      return data;
    },
  });

  const onSubmit = (setError: UseFormSetError<TaskData>) => async (data: TaskData) => {
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
    queryKey: ["task"],
    queryFn: async () => {
      const data: TaskData = {
        title: "title",
        description: "description",
        category_id: "1",
        answers: [
          { isCorrect: true, value: "value1" },
          { isCorrect: true, value: "value2" },
        ],
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
