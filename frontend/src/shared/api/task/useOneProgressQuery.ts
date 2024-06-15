import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { TaskProgressResponse } from "./types";

const getOne = async (id: string) => {
  return (await axiosClient.get<TaskProgressResponse>(`/tasks/user/${id}`)).data;
};

export const useOneProgressQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.task.one, queryKeys.progress, id],
    queryFn: () => getOne(id),
  });
};
