import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/shared/api/client";

import { ImageResponse } from "../types";

export const uploadImage = async (data: FormData) => {
  return await axiosClient.post<ImageResponse>("/images/admin", data, {
    headers: {
      "Content-Type": "multipart/form-data; charset=utf-8",
    },
  });
};

export const useImageUploadMutation = () => {
  return useMutation({ mutationFn: uploadImage });
};
