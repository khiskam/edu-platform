import { useMutation } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Lesson } from "@/shared/types";

import { axiosClient } from "../client";
import { LessonResponse } from "../types";
import { lessonToLessonData } from "./utils";

const remove = async (data: Lesson) => {
  return await axiosClient.put<LessonResponse>(
    `/admin/lessons/${data.id}`,
    lessonToLessonData(data)
  );
};

export const useUpdateMutation = () => {
  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      useMessageStore.setState({
        content: { message: "Занятие успешно изменено", type: "success" },
      });
    },
  });
};
