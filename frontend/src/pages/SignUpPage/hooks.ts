import { sendEmailVerification } from "firebase/auth";
import { useMemo } from "react";
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetError,
  UseFormTrigger,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSignUpMutation } from "@/shared/api";
import { auth } from "@/shared/config";
import { ROUTES } from "@/shared/constants";
import { getAuthError } from "@/shared/utils";

import { FormData } from "./fields";

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
      const error = getAuthError(e);

      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  });

  return { onSubmit, isPending };
};

export const useHandler = (
  getValues: UseFormGetValues<FormData>,
  trigger: UseFormTrigger<FormData>
) => {
  return useMemo(
    (): Record<keyof FormData, React.ChangeEventHandler | undefined> => ({
      email: undefined,
      confirmPassword: undefined,
      password: () => {
        if (getValues("confirmPassword") !== undefined) {
          trigger("confirmPassword");
        }
      },
    }),
    [getValues, trigger]
  );
};
