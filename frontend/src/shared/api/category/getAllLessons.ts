import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { LessonsResponse } from "../types";

const getAllLessons = async (id: string, page: string) => {
  return (
    await axiosClient.get<LessonsResponse>(`/admin/categories/${id}/lessons`, {
      params: { limit: LIMIT, page },
    })
  ).data;
};

export const useGetAllLessonsQuery = (id: string, page: string) => {
  return useQuery({
    queryKey: [queryKeys.lesson.all, page],
    queryFn: () => getAllLessons(id, page),
  });
};
