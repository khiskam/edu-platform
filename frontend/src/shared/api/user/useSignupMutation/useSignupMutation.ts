import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { useRef } from "react";

import { useUserStore } from "@/shared/store";

import { API_URL } from "../../constants";
import { auth } from "../../firebase";
import { UserResponse } from "../types";
import { FirebaseSignupData, ServerSignupData, SignupData } from "./types";

const firebaseSignup = async (data: FirebaseSignupData) => {
  return (await createUserWithEmailAndPassword(auth, data.email, data.password)).user;
};

const serverSignup = async (data: ServerSignupData) => {
  const { token, firstName, lastName } = data;

  return await axios.post<UserResponse>(
    `${API_URL}/users/signup`,
    { firstName, lastName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const useFirebaseSignupMutation = () => {
  return useMutation({ mutationFn: firebaseSignup });
};

export const useServerSignupMutation = () => {
  return useMutation({ mutationFn: serverSignup });
};

export const useSignupMutation = () => {
  const firebase = useFirebaseSignupMutation();
  const server = useServerSignupMutation();

  const userCred = useRef<User>();

  const submit = async (data: SignupData) => {
    useUserStore.setState({ isLoading: false });
    data.email = data.email.trim();
    data.password = data.password.trim();

    userCred.current = await firebase.mutateAsync(data);

    const token = await userCred.current.getIdToken();

    const { firstName, lastName } = data;

    const {
      data: { user },
    } = await server.mutateAsync({ token, firstName, lastName });

    useUserStore.setState({ auth: { token, role: user.role }, isLoading: true });
  };

  return {
    submit,
    userCred: userCred.current,
    isPending: firebase.isPending || server.isPending,
    isSuccess: firebase.isSuccess && server.isSuccess,
  };
};
