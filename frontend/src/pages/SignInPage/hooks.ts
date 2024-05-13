import { User } from "firebase/auth";
import { UseFormHandleSubmit, UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { firebase, server } from "@/shared/api";
import { ROUTES } from "@/shared/constants";
import { getAuthError } from "@/shared/utils";

import { FormData } from "./schema";

export const useFormSubmit = (
  handleSubmit: UseFormHandleSubmit<FormData>,
  setError: UseFormSetError<FormData>
) => {
  const firebaseMutation = firebase.useSignInMutation();
  const serverMutation = server.useSignInMutation();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    let user: User | undefined = undefined;

    try {
      user = await firebaseMutation.mutateAsync(data);
      await serverMutation.mutateAsync(await user.getIdToken());

      navigate(ROUTES.main);
    } catch (e) {
      const error = getAuthError(e);
      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  });

  return {
    onSubmit,
    isLoading: firebaseMutation.isPending || serverMutation.isPending,
    isError: firebaseMutation.isError || serverMutation.isError,
  };
};
