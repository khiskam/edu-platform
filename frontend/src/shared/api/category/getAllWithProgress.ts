import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { CategoriesWithProgressResponse } from "../types";

const getAll = async (page: string) => {
  return (
    await axiosClient.get<CategoriesWithProgressResponse>("/categories", {
      params: { limit: LIMIT, page },
    })
  ).data;
};

export const useGetAllWithProgressQuery = (page: string) => {
  return useQuery({
    queryKey: [queryKeys.category.all, queryKeys.progress, page],
    queryFn: () => getAll(page),
  });
};
