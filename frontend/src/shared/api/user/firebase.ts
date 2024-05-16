import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { SignInData, SignUpData } from "@/shared";

import { auth } from "../firebase";

const signUp = async (data: SignUpData) => {
  return (await createUserWithEmailAndPassword(auth, data.email, data.password)).user;
};

const signIn = async (data: SignInData) => {
  return (await signInWithEmailAndPassword(auth, data.email, data.password)).user;
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};
