import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { StatisticsResponse } from "../types";

const getOne = async () => {
  return (await axiosClient.get<StatisticsResponse>("/statistics")).data;
};

export const useGetOneQuery = () => {
  return useQuery({ queryKey: [queryKeys.statistics], queryFn: () => getOne() });
};
