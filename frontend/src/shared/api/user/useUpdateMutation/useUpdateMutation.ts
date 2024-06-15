import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useMessageStore, useUserStore } from "@/shared/store";
import { UpdateUserData } from "@/shared/types";

import { axiosClient } from "../../client";
import { queryKeys } from "../../keys";
import { UserResponse } from "../types";
import { UpdateData } from "./types";

const serverUpdate = async (data: UpdateData) => {
  const { firstName, lastName } = data;

  return await axiosClient.put<UserResponse>(`/users`, { firstName, lastName });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: serverUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.profile] });
      useMessageStore.setState({
        content: { message: "Профиль успешно изменен", type: "success" },
      });
    },
  });
};

export const useUpdateMutation = () => {
  const { isPending, isSuccess, mutateAsync } = useUpdate();

  const submit = async (data: UpdateUserData) => {
    useUserStore.setState({ isLoading: false });
    const { firstName, lastName } = data;

    await mutateAsync({ firstName, lastName });
  };

  return { submit, isPending, isSuccess };
};
