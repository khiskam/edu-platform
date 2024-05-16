import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { User } from "@/shared";

import { API_URL } from "../constants";

const USER_API_URL = `${API_URL}/users`;

const signUp = async (token: string) => {
  return await axios.post<User>(`${USER_API_URL}/signup`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const signIn = async (token: string) => {
  return await axios.post<User>(`${USER_API_URL}/signup`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};
