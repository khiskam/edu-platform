import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
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

const signUp = async (token: string) => {
  await axios.post(
    import.meta.env.VITE_API_URL + `/api/users/signup`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const useSignUp = () => useMutation({ mutationFn: signUp });

export const useFormSubmit = (
  handleSubmit: UseFormHandleSubmit<FormData>,
  setError: UseFormSetError<FormData>
) => {
  const { mutateAsync: signUp, isPending } = useSignUpMutation();
  const { mutateAsync: serverSignUp, isPending: serverIsPending } = useSignUp();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          sendEmailVerification(user);
          await serverSignUp(token);
          navigate(ROUTES.main);
        }
      });
    } catch (e) {
      const error = getAuthError(e);

      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  });

  return { onSubmit, isPending: isPending || serverIsPending };
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
