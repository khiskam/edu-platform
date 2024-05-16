import { useMutation } from "@tanstack/react-query";

import { Lesson } from "@/shared/types";

import { axiosClient } from "../client";
import { LESSONS_API_URL } from "./constants";

const remove = async (id: string) => {
  return await axiosClient.delete<Lesson>(`${LESSONS_API_URL}/${id}`, undefined);
};

export const useDeleteMutation = () => {
  return useMutation({ mutationFn: remove });
};
