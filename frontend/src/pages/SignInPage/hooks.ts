import { UseFormHandleSubmit, UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSignInMutation } from "@/shared/api";
import { ROUTES } from "@/shared/constants";

import { FormData, getError } from "./fields";

export const useFormSubmit = (
  handleSubmit: UseFormHandleSubmit<FormData>,
  setError: UseFormSetError<FormData>
) => {
  const navigate = useNavigate();
  const { mutateAsync: signIn, isPending } = useSignInMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn(data);

      navigate(ROUTES.main);
    } catch (e) {
      const error = getError(e);

      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  });

  return { onSubmit, isPending };
};
