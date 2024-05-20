import { useQuery } from "@tanstack/react-query";

import { Lesson } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { LESSONS_API_URL } from "./constants";

const getAll = async () => {
  return (await axiosClient.get<Lesson[]>(LESSONS_API_URL)).data;
};

export const useGetAllQuery = () => {
  return useQuery({ queryKey: [queryKeys.lesson.all], queryFn: getAll });
};
