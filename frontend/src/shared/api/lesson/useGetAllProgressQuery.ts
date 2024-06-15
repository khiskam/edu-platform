import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { LessonsProgressResponse } from "./types";

const getAll = async (id: string, { limit = LIMIT, page = OFFSET, q }: QueryParams) => {
  return (
    await axiosClient.get<LessonsProgressResponse>(`/categories/user/${id}/lessons`, {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllProgressQuery = (
  id: string,
  { limit = LIMIT, page = OFFSET, q }: QueryParams
) => {
  return useQuery({
    queryKey: [
      queryKeys.category.one,
      id,
      queryKeys.progress,
      queryKeys.lesson.all,
      page,
      q,
      limit,
    ],
    queryFn: () => getAll(id, { limit, page, q }),
  });
};
