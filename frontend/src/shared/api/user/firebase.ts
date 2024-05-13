import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";
import { AuthData } from "./types";

const signUp = async (data: AuthData) => {
  return (await createUserWithEmailAndPassword(auth, data.email, data.password))
    .user;
};

const signIn = async (data: AuthData) => {
  return (await signInWithEmailAndPassword(auth, data.email, data.password))
    .user;
};

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};
