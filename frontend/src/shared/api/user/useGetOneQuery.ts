import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { UserDetailsResponse } from "./types";

const getOneDetails = async () => {
  return (await axiosClient.get<UserDetailsResponse>("/users")).data;
};

export const useGetOneQuery = () => {
  return useQuery({ queryKey: [queryKeys.profile], queryFn: () => getOneDetails() });
};
