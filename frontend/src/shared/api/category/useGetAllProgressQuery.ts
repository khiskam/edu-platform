import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { CategoriesProgressResponse } from "./types";

const getAll = async ({ limit = LIMIT, page = OFFSET, q }: QueryParams) => {
  return (
    await axiosClient.get<CategoriesProgressResponse>("/categories/user", {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllProgressQuery = ({ limit = LIMIT, page = OFFSET, q }: QueryParams) => {
  return useQuery({
    queryKey: [queryKeys.category.all, queryKeys.progress, page, q, limit],
    queryFn: () => getAll({ page, limit, q }),
  });
};
