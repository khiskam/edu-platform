import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Task } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { TaskWithAnswersReponse } from "../types";
import { taskToTaskData } from "./utils";

const update = async (data: Task) => {
  return await axiosClient.put<TaskWithAnswersReponse>(
    `/admin/tasks/${data.id}`,
    taskToTaskData(data)
  );
};

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: update,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.task.one, response.data.task.id] });
      useMessageStore.setState({
        content: { message: "Задание успешно изменено", type: "success" },
      });
    },
  });
};
