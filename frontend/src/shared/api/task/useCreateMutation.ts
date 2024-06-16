import { useMutation } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { TaskData } from "@/shared/types";

import { axiosClient } from "../client";
import { TaskResponse } from "./types";

const create = async (data: TaskData) => {
  return await axiosClient.post<TaskResponse>("/tasks/admin", data);
};

export const useCreateMutation = () => {
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      useMessageStore.setState({
        content: { message: "Задание успешно добавлено", type: "success" },
      });
    },
  });
};
