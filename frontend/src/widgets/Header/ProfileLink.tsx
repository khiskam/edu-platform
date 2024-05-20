import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

export const ProfileLink = () => {
  const auth = useUserStore(({ auth }) => auth);

  if (!auth) return <NavLink to={ROUTES.profile.path}>Профиль</NavLink>;

  return auth.role === "user" ? (
    <NavLink to={ROUTES.profile.path}>Профиль</NavLink>
  ) : (
    <NavLink to={ROUTES.admin.path}>Админ-панель</NavLink>
  );
};
