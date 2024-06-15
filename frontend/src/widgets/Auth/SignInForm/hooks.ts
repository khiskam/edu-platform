import { signOut } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

import { auth, UserApi } from "@/shared/api";
import { SignInData } from "@/shared/types";

import { getAuthError } from "../utils";

export const useFormSubmit = () => {
  const { submit, isPending, isSuccess } = UserApi.useSigninMutation();

  const onSubmit = (setError: UseFormSetError<SignInData>) => async (data: SignInData) => {
    try {
      await submit(data);
    } catch (e) {
      await signOut(auth);

      const error = getAuthError(e);
      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  };

  return { onSubmit, isPending, isSuccess };
};
