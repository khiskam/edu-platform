import { useMutation } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { LessonData } from "@/shared/types";

import { axiosClient } from "../client";
import { LessonResponse } from "./types";

const create = async (data: LessonData) => {
  return await axiosClient.post<LessonResponse>("/lessons/admin", data);
};

export const useCreateMutation = () => {
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      useMessageStore.setState({
        content: { message: "Занятие успешно добавлено", type: "success" },
      });
    },
  });
};
