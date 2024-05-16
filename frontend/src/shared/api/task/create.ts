import { useMutation } from "@tanstack/react-query";

import { Task, TaskData } from "@/shared/types";

import { axiosClient } from "../client";
import { TASKS_API_URL } from "./constants";

const create = async (data: TaskData) => {
  return await axiosClient.post<Task>(`${TASKS_API_URL}`, data);
};

export const useCreateMutation = () => {
  return useMutation({ mutationFn: create });
};
