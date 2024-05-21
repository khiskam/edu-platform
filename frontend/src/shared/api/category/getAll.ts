import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT } from "../constants";
import { queryKeys } from "../keys";
import { CategoriesResponse } from "../types";

const getAll = async (page: string) => {
  return (
    await axiosClient.get<CategoriesResponse>("/admin/categories", {
      params: { limit: LIMIT, page },
    })
  ).data;
};

export const useGetAllQuery = (page: string) => {
  return useQuery({
    queryKey: [queryKeys.category.all, page],
    queryFn: () => getAll(page),
  });
};
