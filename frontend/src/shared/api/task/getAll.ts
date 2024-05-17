import { useQuery } from "@tanstack/react-query";

import { Task } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { TASKS_API_URL } from "./constants";

const getAll = async () => {
  return (await axiosClient.get<Task[]>(TASKS_API_URL)).data;
};

export const useGetAllQuery = () => {
  return useQuery({ queryKey: [queryKeys.category.all], queryFn: getAll });
};
