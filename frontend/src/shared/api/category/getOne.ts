import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CategoriesResponse } from "./types";

const getOne = async (id: string) => {
  return (await axiosClient.get<CategoriesResponse>(`/admin/categories/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.category.one], queryFn: () => getOne(id) });
};
