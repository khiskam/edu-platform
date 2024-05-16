import { useMutation } from "@tanstack/react-query";

import { Lesson } from "@/shared";

import { axiosClient } from "../client";
import { LESSONS_API_URL } from "./constants";
import { lessonToLessonData } from "./utils";

const remove = async (data: Lesson) => {
  return await axiosClient.put<Lesson>(`${LESSONS_API_URL}/${data.id}`, lessonToLessonData(data));
};

export const useUpdateMutation = () => {
  return useMutation({ mutationFn: remove });
};
