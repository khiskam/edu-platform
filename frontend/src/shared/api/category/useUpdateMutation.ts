import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Category } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CategoryResponse } from "./types";
import { categoryToCategoryData } from "./utils";

const remove = async (data: Category) => {
  return await axiosClient.put<CategoryResponse>(
    `/categories/admin/${data.id}`,
    categoryToCategoryData(data)
  );
};

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (response) => {
      const id = response.data.category.id;

      queryClient.invalidateQueries({ queryKey: [queryKeys.category.one, id] });
      useMessageStore.setState({
        content: { message: "Категория успешно изменена", type: "success" },
      });
    },
  });
};
