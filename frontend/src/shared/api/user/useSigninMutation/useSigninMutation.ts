import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useUserStore } from "@/shared/store";

import { API_URL } from "../../constants";
import { auth } from "../../firebase";
import { UserResponse } from "../types";
import { FirebaseSigninData, ServerSigninData, SigninData } from "./types";

const firebaseSignin = async (data: FirebaseSigninData) => {
  return (await signInWithEmailAndPassword(auth, data.email, data.password)).user;
};

const serverSignin = async (data: ServerSigninData) => {
  return await axios.post<UserResponse>(`${API_URL}/users/signin`, undefined, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};

export const useFirebaseSigninMutation = () => {
  return useMutation({ mutationFn: firebaseSignin });
};

export const useServerSigninMutation = () => {
  return useMutation({ mutationFn: serverSignin });
};

export const useSigninMutation = () => {
  const firebase = useFirebaseSigninMutation();
  const server = useServerSigninMutation();

  const submit = async (data: SigninData) => {
    useUserStore.setState({ isLoading: false });
    data.email = data.email.trim();
    data.password = data.password.trim();

    const userCred = await firebase.mutateAsync(data);
    const token = await userCred.getIdToken();

    const {
      data: { user },
    } = await server.mutateAsync({ token });

    useUserStore.setState({ auth: { token, role: user.role }, isLoading: true });
  };

  return {
    submit,
    isPending: firebase.isPending || server.isPending,
    isSuccess: firebase.isSuccess && server.isSuccess,
  };
};
