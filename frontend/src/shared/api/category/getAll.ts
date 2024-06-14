import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { CategoriesResponse } from "../types";

const getAll = async (page: string, limit: string = LIMIT, q?: string) => {
  return (
    await axiosClient.get<CategoriesResponse>("/categories", {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllQuery = (page: string, limit: string = LIMIT, q?: string) => {
  return useQuery({
    queryKey: [queryKeys.category.all, page, q, limit],
    queryFn: () => getAll(page, limit, q),
  });
};
