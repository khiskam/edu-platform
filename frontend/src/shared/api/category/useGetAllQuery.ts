import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { CategoriesResponse } from "./types";

const getAll = async ({ limit = LIMIT, page = OFFSET, q }: QueryParams) => {
  return (
    await axiosClient.get<CategoriesResponse>("/categories", {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllQuery = ({ limit = LIMIT, page = OFFSET, q }: QueryParams) => {
  return useQuery({
    queryKey: [queryKeys.category.all, page, q, limit],
    queryFn: () => getAll({ page, limit, q }),
  });
};
