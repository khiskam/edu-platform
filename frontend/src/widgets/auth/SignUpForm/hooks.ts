import { User } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

import { firebase, server } from "@/shared/api";
import { useUserStore } from "@/shared/store";
import { SignUpData } from "@/shared/types";

import { getAuthError } from "../utils";

export const useFormSubmit = () => {
  const firebaseMutation = firebase.useSignUpMutation();
  const serverMutation = server.useSignUpMutation();

  const onSubmit = (setError: UseFormSetError<SignUpData>) => async (data: SignUpData) => {
    let userCred: User | undefined = undefined;

    try {
      userCred = await firebaseMutation.mutateAsync(data);
      const token = await userCred.getIdToken();
      const {
        data: { user },
      } = await serverMutation.mutateAsync(token);

      useUserStore.setState({ auth: { token, role: user.role } });
    } catch (e) {
      if (userCred) await userCred.delete();

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
