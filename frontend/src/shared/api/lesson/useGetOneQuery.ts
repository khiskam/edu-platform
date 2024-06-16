import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { LessonResponse } from "./types";

const getOne = async (id: string) => {
  return (await axiosClient.get<LessonResponse>(`/lessons/admin/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.lesson.one, id], queryFn: () => getOne(id) });
};
