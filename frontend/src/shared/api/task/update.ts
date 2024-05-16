import { useMutation } from "@tanstack/react-query";

import { Task } from "@/shared";

import { axiosClient } from "../client";
import { TASKS_API_URL } from "./constants";
import { taskToTaskData } from "./utils";

const remove = async (data: Task) => {
  return await axiosClient.put<Task>(`${TASKS_API_URL}/${data.id}`, taskToTaskData(data));
};

export const useUpdateMutation = () => {
  return useMutation({ mutationFn: remove });
};
