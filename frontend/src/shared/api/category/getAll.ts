import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CategoriesResponse } from "./types";

const getAll = async (page: number, pageSize: number) => {
  return (
    await axiosClient.get<CategoriesResponse>("/admin/categories", {
      params: { limit: pageSize, page },
    })
  ).data;
};

export const useGetAllQuery = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: [queryKeys.category.all, page],
    queryFn: () => getAll(page, pageSize),
  });
};
