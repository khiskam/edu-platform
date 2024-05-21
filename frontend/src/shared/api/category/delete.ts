import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Category } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";

const remove = async (id: string) => {
  return await axiosClient.delete<Category>(`/admin/categories/${id}`, undefined);
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.category.all] });
      useMessageStore.setState({
        content: { message: "Категория успешно удалена", type: "success" },
      });
    },
  });
};
