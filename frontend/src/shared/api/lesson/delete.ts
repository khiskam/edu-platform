import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Lesson } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";

const remove = async (id: string) => {
  return await axiosClient.delete<Lesson>(`/admin/lessons/${id}`, undefined);
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.lesson.all] });
      useMessageStore.setState({
        content: { message: "Занятие успешно удалено", type: "success" },
      });
    },
  });
};
