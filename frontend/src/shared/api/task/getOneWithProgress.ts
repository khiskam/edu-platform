import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { TaskWithProgressResponse } from "../types";

const getOne = async (id: string) => {
  return (await axiosClient.get<TaskWithProgressResponse>(`/tasks/${id}`)).data;
};

export const useOneWithProgress = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.task.one, queryKeys.progress, id],
    queryFn: () => getOne(id),
  });
};
