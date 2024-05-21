import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/shared/api/client";

import { ImageResponse } from "../types";

export const uploadImage = async (data: FormData) => {
  return await axiosClient.post<ImageResponse>("/admin/images", data, {
    headers: {
      "Content-Type": "multipart/form-data; charset=utf-8",
    },
  });
};

export const useImageMutation = () => {
  return useMutation({ mutationFn: uploadImage });
};
