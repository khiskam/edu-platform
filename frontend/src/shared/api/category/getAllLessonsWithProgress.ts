import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { LessonsWithProgressResponse } from "../types";

const getAll = async (categoryId: string, page: string) => {
  return (
    await axiosClient.get<LessonsWithProgressResponse>(`/categories/${categoryId}/lessons`, {
      params: { limit: LIMIT, page },
    })
  ).data;
};

export const useGetAllLessonsWithProgressQuery = (categoryId: string, page: string) => {
  return useQuery({
    queryKey: [queryKeys.lesson.all, queryKeys.progress, page, categoryId],
    queryFn: () => getAll(categoryId, page),
  });
};
