import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

export const UnauthProtectedRoutes = () => {
  const auth = useUserStore.getState().auth;

  if (auth) {
    return <Navigate to={ROUTES.main.path} />;
  }

  return <Outlet />;
};

export const AuthProtectedRoutes = () => {
  const auth = useUserStore.getState().auth;

  if (!auth) {
    return <Navigate to={ROUTES.signin.path} />;
  }

  return <Outlet />;
};

export const AdminProtectedRoutes = () => {
  const auth = useUserStore.getState().auth;

  if (!auth) {
    return <Navigate to={ROUTES.signin.path} />;
  }

  if (auth.role !== "admin") {
    return <Navigate to={ROUTES.profile.path} />;
  }

  return <Outlet />;
};
