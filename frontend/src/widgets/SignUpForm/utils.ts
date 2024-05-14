import { sendEmailVerification, User } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

import { firebase, server } from "@/shared/api";
import { getAuthError } from "@/shared/utils";

import { FormData } from "./schema";

export const useFormSubmit = () => {
  const firebaseMutation = firebase.useSignUpMutation();
  const serverMutation = server.useSignUpMutation();

  const onSubmit = (setError: UseFormSetError<FormData>) => async (data: FormData) => {
    let user: User | undefined = undefined;

    try {
      user = await firebaseMutation.mutateAsync(data);
      await serverMutation.mutateAsync(await user.getIdToken());
      await sendEmailVerification(user);
    } catch (e) {
      if (user) await user.delete();

      const error = getAuthError(e);
      if (error) {
        setError(error.field, { message: error.message });
      }
    }
  };

  return {
    onSubmit,
    isLoading: firebaseMutation.isPending || serverMutation.isPending,
    isSuccess: firebaseMutation.isSuccess && serverMutation.isSuccess,
  };
};
