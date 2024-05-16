import { signOut, User } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

import { auth, firebase, server } from "@/shared/api";
import { getAuthError } from "@/shared/utils";
import { SignInData } from "@/shared/validation";

export const useFormSubmit = () => {
  const firebaseMutation = firebase.useSignInMutation();
  const serverMutation = server.useSignInMutation();

  const onSubmit = (setError: UseFormSetError<SignInData>) => async (data: SignInData) => {
    let user: User | undefined = undefined;

    try {
      user = await firebaseMutation.mutateAsync(data);
      await serverMutation.mutateAsync(await user.getIdToken());
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
