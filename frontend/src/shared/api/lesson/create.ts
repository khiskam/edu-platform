import { useMutation } from "@tanstack/react-query";

import { Lesson } from "@/shared";
import { LessonData } from "@/shared";

import { axiosClient } from "../client";
import { LESSONS_API_URL } from "./constants";

const create = async (data: LessonData) => {
  return await axiosClient.post<Lesson>(`${LESSONS_API_URL}`, data);
};

export const useCreateMutation = () => {
  return useMutation({ mutationFn: create });
};
