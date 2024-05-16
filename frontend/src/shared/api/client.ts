import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useUserStore } from "@/shared/store";

import { API_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = useUserStore().auth?.token;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const queryClient = new QueryClient();

export { axiosClient, queryClient };
