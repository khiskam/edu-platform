import { useMutation } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { CategoryData } from "@/shared/types";

import { axiosClient } from "../client";
import { CategoryResponse } from "../types";

const create = async (data: CategoryData) => {
  return await axiosClient.post<CategoryResponse>("/admin/categories", data);
};

export const useCreateMutation = () => {
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      useMessageStore.setState({
        content: { message: "Категория успешно добавлена", type: "success" },
      });
    },
  });
};
