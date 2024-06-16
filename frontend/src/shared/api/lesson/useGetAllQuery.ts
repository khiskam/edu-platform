import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { LessonsResponse } from "./types";

const getAll = async (categoryId: string, { page = OFFSET, limit = LIMIT, q }: QueryParams) => {
  return (
    await axiosClient.get<LessonsResponse>(`/categories/admin/${categoryId}/lessons`, {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllQuery = (
  categoryId: string,
  { page = OFFSET, limit = LIMIT, q }: QueryParams
) => {
  return useQuery({
    queryKey: [queryKeys.lesson.all, categoryId, page, limit, q],
    queryFn: () => getAll(categoryId, { page, limit, q }),
  });
};
