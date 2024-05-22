import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { LessonWithProgressResponse } from "../types";

const getOne = async (id: string) => {
  return (await axiosClient.get<LessonWithProgressResponse>(`/lessons/${id}`)).data;
};

export const useOneWithProgress = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.lesson.one, queryKeys.progress, id],
    queryFn: () => getOne(id),
  });
};
