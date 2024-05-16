import { useMutation } from "@tanstack/react-query";

import { Category } from "@/shared";

import { axiosClient } from "../client";
import { CATEGORIES_API_URL } from "./constants";
import { categoryToCategoryData } from "./utils";

const remove = async (data: Category) => {
  return await axiosClient.put<Category>(
    `${CATEGORIES_API_URL}/${data.id}`,
    categoryToCategoryData(data)
  );
};

export const useUpdateMutation = () => {
  return useMutation({ mutationFn: remove });
};
