import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

export const getUserKey = () => {
  const auth = useUserStore.getState().auth;

  if (!auth) {
    return "";
  }

  return auth.role === "user" ? ROUTES.profile.path : ROUTES.admin.path;
};
