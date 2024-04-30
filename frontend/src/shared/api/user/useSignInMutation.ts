import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/shared/config";

import { AuthData } from "./types";

const signIn = async (data: AuthData) => {
  await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};
