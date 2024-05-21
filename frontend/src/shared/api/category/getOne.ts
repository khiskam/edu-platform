import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CategoryResponse } from "../types";

const getOne = async (id: string) => {
  return (await axiosClient.get<CategoryResponse>(`/admin/categories/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.category.one, id], queryFn: () => getOne(id) });
};
