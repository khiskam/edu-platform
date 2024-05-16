import { useMutation } from "@tanstack/react-query";

import { Category } from "@/shared";
import { CategoryData } from "@/shared";

import { axiosClient } from "../client";
import { CATEGORIES_API_URL } from "./constants";

const create = async (data: CategoryData) => {
  return await axiosClient.post<Category>(`${CATEGORIES_API_URL}`, data);
};

export const useCreateMutation = () => {
  return useMutation({ mutationFn: create });
};
