import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Id } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { Answer, CompletedTaskResponse } from "../types";
import { COMFORTING_WORDS } from "./constants";

const create = async (data: Answer & Id) => {
  return await axiosClient.post<CompletedTaskResponse>(`/tasks/user/${data.id}`, {
    answers: data.answers,
  });
};

export const useCreateCompletedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.task.one, queryKeys.progress, response.data.task.taskId],
      });
    },
    onError: () => {
      useMessageStore.setState({
        content: {
          message: `Неверный ответ... ${
            COMFORTING_WORDS[Math.floor(Math.random() * COMFORTING_WORDS.length)]
          }`,
          type: "warning",
        },
      });
    },
  });
};
