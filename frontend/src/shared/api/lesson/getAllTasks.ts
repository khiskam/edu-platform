import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { TasksResponse } from "../types";

const getAllTasks = async (id: string, page: string) => {
  return (
    await axiosClient.get<TasksResponse>(`/admin/lessons/${id}/tasks`, {
      params: { limit: LIMIT, page },
    })
  ).data;
};

export const useGetAllTasksQuery = (id: string, page: string) => {
  return useQuery({
    queryKey: [queryKeys.task.all, page],
    queryFn: () => getAllTasks(id, page),
  });
};
