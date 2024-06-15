import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useMessageStore } from "@/shared/store";
import { SignInData, SignUpData } from "@/shared/types";

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
  return useMutation({
    mutationFn: signIn,
    onError: () => {
      useMessageStore.setState({
        content: { message: "Ошибка сервера. Не получилось войти в систему", type: "error" },
      });
    },
  });
};
