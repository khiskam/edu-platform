import Spin from "antd/es/spin";
import { onAuthStateChanged } from "firebase/auth";
import { useLayoutEffect, useState } from "react";

import { auth, UserApi } from "@/shared/api";
import { useUserStore } from "@/shared/store";

import { fullscreen } from "./styled";
import { AuthProviderProps, ServerAuthProviderProps } from "./types";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setToken(user ? await user.getIdToken() : undefined);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Spin size="large" className={fullscreen} />;
  } else if (!token) {
    return <>{children}</>;
  } else {
    return <ServerAuthProvider token={token}>{children}</ServerAuthProvider>;
  }
};

export const ServerAuthProvider = ({ token, children }: ServerAuthProviderProps) => {
  const { data, isLoading, isError } = UserApi.useCheckQuery(token);
  const auth = useUserStore(({ auth }) => auth);

  useLayoutEffect(() => {
    if (data) {
      const { user } = data;
      useUserStore.setState({ auth: { token, role: user.role } });
    }
  }, [data, token]);

  if (isLoading) {
    return <Spin size="large" className={fullscreen} />;
  } else if (isError) {
    return <>{children}</>;
  } else if (!auth) {
    return <Spin size="large" className={fullscreen} />;
  } else {
    return <>{children}</>;
  }
};
