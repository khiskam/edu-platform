import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore } from "@/shared/store";
import { Lesson } from "@/shared/types";

import { axiosClient } from "../client";
import { queryKeys } from "../keys";
import { LessonResponse } from "./types";

const update = async (data: Lesson) => {
  return await axiosClient.put<LessonResponse>(`/lessons/admin/${data.id}`, {
    title: data.title,
    description: data.description,
    categoryId: data.categoryId,
    layout: data.layout,
  });
};

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: update,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.lesson.one, response.data.lesson.id] });
      useMessageStore.setState({
        content: { message: "Занятие успешно изменено", type: "success" },
      });
    },
  });
};
