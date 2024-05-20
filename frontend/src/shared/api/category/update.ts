import { useMutation } from "@tanstack/react-query";

import { Category } from "@/shared/types";

import { axiosClient } from "../client";
import { categoryToCategoryData } from "./utils";

const remove = async (data: Category) => {
  return await axiosClient.put<Category>(
    `/admin/categories/${data.id}`,
    categoryToCategoryData(data)
  );
};

export const useUpdateMutation = () => {
  return useMutation({ mutationFn: remove });
};
