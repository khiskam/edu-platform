import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CategoryWithProgressResponse } from "../types";

const getAll = async (id: string) => {
  return (await axiosClient.get<CategoryWithProgressResponse>(`/categories/${id}`)).data;
};

export const useGetOneWithProgressQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.category.all, queryKeys.progress, id],
    queryFn: () => getAll(id),
  });
};
