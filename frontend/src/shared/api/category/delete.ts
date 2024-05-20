import { useMutation } from "@tanstack/react-query";

import { Category } from "@/shared/types";

import { axiosClient } from "../client";

const remove = async (id: string) => {
  return await axiosClient.delete<Category>(`/admin/categories/${id}`, undefined);
};

export const useDeleteMutation = () => {
  return useMutation({ mutationFn: remove });
};
