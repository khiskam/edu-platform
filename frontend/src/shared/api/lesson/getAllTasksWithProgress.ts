import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { TasksWithProgressResponse } from "../types";

const getAll = async (lessonId: string, page: string) => {
  return (
    await axiosClient.get<TasksWithProgressResponse>(`/lessons/${lessonId}/tasks`, {
      params: { limit: LIMIT, page },
    })
  ).data;
};

export const useGetAllTasksWithProgressQuery = (lessonId: string, page: string) => {
  return useQuery({
    queryKey: [queryKeys.lesson.all, queryKeys.progress, page, lessonId],
    queryFn: () => getAll(lessonId, page),
  });
};
