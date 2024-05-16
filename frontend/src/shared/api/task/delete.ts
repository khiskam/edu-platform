import { useMutation } from "@tanstack/react-query";

import { Task } from "@/shared/types";

import { axiosClient } from "../client";
import { TASKS_API_URL } from "./constants";

const remove = async (id: string) => {
  return await axiosClient.delete<Task>(`${TASKS_API_URL}/${id}`, undefined);
};

export const useDeleteMutation = () => {
  return useMutation({ mutationFn: remove });
};
