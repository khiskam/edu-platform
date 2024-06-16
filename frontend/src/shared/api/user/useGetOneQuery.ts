import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { UserDetailsResponse } from "./types";

const getOneDetails = async (userId: string) => {
  return (await axiosClient.get<UserDetailsResponse>(`/users/admin/profiles/${userId}`)).data;
};

export const useGetOneQuery = (userId: string) => {
  return useQuery({ queryKey: [queryKeys.users.one], queryFn: () => getOneDetails(userId) });
};
