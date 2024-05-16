import { ROUTES, useUserStore } from "@/shared";

export const getUserKey = () => {
  const auth = useUserStore.getState().auth;

  if (!auth) {
    return "";
  }

  return auth.role === "user" ? ROUTES.profile.path : ROUTES.admin.path;
};
