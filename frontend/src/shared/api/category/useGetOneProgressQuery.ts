import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CategoryProgressResponse } from "./types";

const getOneProgress = async (id: string) => {
  return (await axiosClient.get<CategoryProgressResponse>(`/categories/user/${id}`)).data;
};

export const useGetOneProgressQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.category.all, queryKeys.progress, id],
    queryFn: () => getOneProgress(id),
  });
};
