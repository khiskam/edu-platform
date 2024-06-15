import { UseFormSetError } from "react-hook-form";

import { UserApi } from "@/shared/api";
import { SignUpData } from "@/shared/types";

import { getAuthError } from "../utils";

export const useFormSubmit = () => {
  const { submit, userCred, isPending, isSuccess } = UserApi.useSignupMutation();

  const onSubmit = (setError: UseFormSetError<SignUpData>) => async (data: SignUpData) => {
    try {
      await submit(data);
    } catch (e) {
      if (userCred) {
        await userCred.delete();
      }

      const error = getAuthError(e);
      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  };

  return { onSubmit, isPending, isSuccess };
};
