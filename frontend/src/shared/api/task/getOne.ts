import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { TaskWithAnswersReponse } from "../types";

const getOne = async (id: string) => {
  return (await axiosClient.get<TaskWithAnswersReponse>(`/admin/tasks/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.task.one, id], queryFn: () => getOne(id) });
};
