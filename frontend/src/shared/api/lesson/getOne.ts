import { useQuery } from "@tanstack/react-query";

import { Lesson } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { LESSONS_API_URL } from "./constants";

const getOne = async (id: string) => {
  return (await axiosClient.get<Lesson>(`${LESSONS_API_URL}/${id}`)).data;
};

export const useGetOneQuery = (id: string) => {
  return useQuery({ queryKey: [queryKeys.lesson.one], queryFn: () => getOne(id) });
};
