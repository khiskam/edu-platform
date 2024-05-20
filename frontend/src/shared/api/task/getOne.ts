import { useQuery } from "@tanstack/react-query";

import { Task } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { TASKS_API_URL } from "./constants";

const getOne = async (id: string) => {
  return (await axiosClient.get<Task>(`${TASKS_API_URL}/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.task.one], queryFn: () => getOne(id) });
};
