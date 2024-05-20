import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { User } from "@/shared/types";

import { API_URL } from "../constants";
import { queryKeys } from "../keys";

const USER_API_URL = `${API_URL}/users`;

const signUp = async (token: string) => {
  return await axios.post<User>(`${USER_API_URL}/signup`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const signIn = async (token: string) => {
  return await axios.post<User>(`${USER_API_URL}/signin`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const checkUser = async (token: string) => {
  return (
    await axios.get<User>(`${USER_API_URL}/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};

export const useUserCheckQuery = (token: string) => {
  return useQuery({ queryKey: [queryKeys.userCheck], queryFn: () => checkUser(token) });
};
