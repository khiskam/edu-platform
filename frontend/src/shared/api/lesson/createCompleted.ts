import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CompletedLessonResponse } from "../types";

const create = async (id: string) => {
  return await axiosClient.post<CompletedLessonResponse>(`/lessons/${id}`);
};

export const useCreateCompletedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.lesson.one, queryKeys.progress, response.data.lesson.lessonId],
      });
      useMessageStore.setState({
        content: { message: "Занятие просмотрено", type: "success" },
      });
    },
  });
};
