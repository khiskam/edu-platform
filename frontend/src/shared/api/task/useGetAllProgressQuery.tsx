import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { TasksProgressResponse } from "./types";

const getAll = async (lessonId: string, { page = OFFSET, limit = LIMIT, q }: QueryParams) => {
  return (
    await axiosClient.get<TasksProgressResponse>(`/lessons/user/${lessonId}/tasks`, {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllProgressQuery = (
  lessonId: string,
  { page = OFFSET, limit = LIMIT, q }: QueryParams
) => {
  return useQuery({
    queryKey: [queryKeys.lesson.all, queryKeys.progress, page, limit, q, lessonId],
    queryFn: () => getAll(lessonId, { page, limit, q }),
  });
};
