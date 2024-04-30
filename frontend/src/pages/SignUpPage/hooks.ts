import { sendEmailVerification } from "firebase/auth";
import { UseFormHandleSubmit, UseFormSetError } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSignUpMutation } from "@/shared/api";
import { auth } from "@/shared/config";
import { ROUTES } from "@/shared/constants";

import { FormData, getError } from "./fields";

export const useFormSubmit = (
  handleSubmit: UseFormHandleSubmit<FormData>,
  setError: UseFormSetError<FormData>
) => {
  const { mutateAsync: signUp, isPending } = useSignUpMutation();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);

      if (auth.currentUser) {
        sendEmailVerification(auth.currentUser);
      }

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
