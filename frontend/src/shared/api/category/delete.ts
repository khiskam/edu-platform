import { useMutation } from "@tanstack/react-query";

import { Category } from "@/shared";

import { axiosClient } from "../client";
import { CATEGORIES_API_URL } from "./constants";

const remove = async (id: string) => {
  return await axiosClient.delete<Category>(`${CATEGORIES_API_URL}/${id}`, undefined);
};

export const useDeleteMutation = () => {
  return useMutation({ mutationFn: remove });
};
