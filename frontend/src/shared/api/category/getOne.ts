import { useQuery } from "@tanstack/react-query";

import { Category } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { CATEGORIES_API_URL } from "./constants";

const getOne = async (id: string) => {
  return (await axiosClient.get<Category>(`${CATEGORIES_API_URL}/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.category.all], queryFn: () => getOne(id) });
};
