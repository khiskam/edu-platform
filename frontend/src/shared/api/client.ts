import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { router } from "@/app/router";

import { ROUTES } from "../routes";
import { useUserStore } from "../store";
import { API_URL } from "./constants";

export const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().auth?.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      router.navigate(ROUTES.signin.path);
    }

    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient();
