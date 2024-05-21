import { signOut, User } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

import { auth, firebase, server } from "@/shared/api";
import { useUserStore } from "@/shared/store";
import { SignInData } from "@/shared/types";

import { getAuthError } from "../utils";

export const useFormSubmit = () => {
  const firebaseMutation = firebase.useSignInMutation();
  const serverMutation = server.useSignInMutation();

  const onSubmit = (setError: UseFormSetError<SignInData>) => async (data: SignInData) => {
    data.email = data.email.trim();
    data.password = data.password.trim();

    let userCred: User | undefined = undefined;

    try {
      userCred = await firebaseMutation.mutateAsync(data);
      const token = await userCred.getIdToken();
      const {
        data: { user },
      } = await serverMutation.mutateAsync(token);

      useUserStore.setState({ auth: { token, role: user.role } });
    } catch (e) {
      await signOut(auth);

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
