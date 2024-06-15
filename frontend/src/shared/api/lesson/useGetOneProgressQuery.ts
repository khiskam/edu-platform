import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { LessonProgressResponse } from "./types";

const getOneProgress = async (id: string) => {
  return (await axiosClient.get<LessonProgressResponse>(`/lessons/user/${id}`)).data;
};

export const useGetOneProgressQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.lesson.one, queryKeys.progress, id],
    queryFn: () => getOneProgress(id),
  });
};
