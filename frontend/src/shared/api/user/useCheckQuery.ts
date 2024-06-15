import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useUserStore } from "@/shared/store";

import { API_URL } from "../constants";
import { queryKeys } from "../keys";
import { UserResponse } from "./types";

const checkUser = async (token: string) => {
  return (
    await axios.get<UserResponse>(`${API_URL}/users/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const useCheckQuery = (token: string) => {
  const isLoading = useUserStore(({ isLoading }) => isLoading);
  return useQuery({
    queryKey: [queryKeys.userCheck, token],
    queryFn: () => checkUser(token),
    enabled: !isLoading,
  });
};
