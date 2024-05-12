import axios from "axios";

import { useUserStore } from "@/shared/store";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = useUserStore().auth?.token;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { axiosClient };
