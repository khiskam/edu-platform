import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";

const remove = async (id: string) => {
  return await axiosClient.delete<void>(`/admin/tasks/${id}`, undefined);
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.task.all] });
      useMessageStore.setState({
        content: { message: "Задание успешно удалено", type: "success" },
      });
    },
  });
};
