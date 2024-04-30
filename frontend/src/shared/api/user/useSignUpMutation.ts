import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/shared/config";

import { AuthData } from "./types";

const signUp = async (data: AuthData) => {
  await createUserWithEmailAndPassword(auth, data.email, data.password);
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};
