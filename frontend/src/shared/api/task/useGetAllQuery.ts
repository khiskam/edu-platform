import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { TasksResponse } from "./types";

const getAll = async (lessonId: string, { page = OFFSET, limit = LIMIT, q }: QueryParams) => {
  return (
    await axiosClient.get<TasksResponse>(`/lessons/admin/${lessonId}/tasks`, {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllQuery = (
  lessonId: string,
  { page = OFFSET, limit = LIMIT, q }: QueryParams
) => {
  return useQuery({
    queryKey: [queryKeys.task.all, lessonId, page, limit, q],
    queryFn: () => getAll(lessonId, { page, limit, q }),
  });
};
