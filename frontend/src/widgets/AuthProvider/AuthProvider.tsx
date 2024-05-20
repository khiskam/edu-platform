import { Spin } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useLayoutEffect, useState } from "react";

import { auth } from "@/shared/api";
import { useUserCheckQuery } from "@/shared/api/user/server";
import { useUserStore } from "@/shared/store";

import { fullscreen } from "./styled";
import { AuthProviderProps, ServerAuthProviderProps } from "./types";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        setToken(undefined);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Spin size="large" className={fullscreen} />;
  }

  if (!token) {
    return <>{children}</>;
  }

  return <ServerAuthProvider token={token}>{children}</ServerAuthProvider>;
};

export const ServerAuthProvider = ({ token, children }: ServerAuthProviderProps) => {
  const { data, isLoading } = useUserCheckQuery(token);
  const auth = useUserStore(({ auth }) => auth);

  useLayoutEffect(() => {
    if (data) {
      const { user } = data;
      useUserStore.setState({ auth: { token, role: user.role } });
    }
  }, [data, token]);

  if (isLoading || !auth) {
    return <Spin size="large" className={fullscreen} />;
  }

  return <>{children}</>;
};
