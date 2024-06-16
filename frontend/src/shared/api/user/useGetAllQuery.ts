import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../client";
import { LIMIT, OFFSET } from "../constants";
import { queryKeys } from "../keys";
import { QueryParams } from "../types";
import { UsersResponse } from "./types";

const getAll = async ({ page = OFFSET, limit = LIMIT, q }: QueryParams) => {
  return (
    await axiosClient.get<UsersResponse>(`/users/admin/profiles`, {
      params: { limit, page, q },
    })
  ).data;
};

export const useGetAllProgressQuery = ({ page = OFFSET, limit = LIMIT, q }: QueryParams) => {
  return useQuery({
    queryKey: [queryKeys.users, queryKeys.profile, page, limit, q],
    queryFn: () => getAll({ page, limit, q }),
  });
};
