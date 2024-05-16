import { NavLink } from "react-router-dom";

import { ROUTES, useUserStore } from "@/shared";

export const ProfileLink = () => {
  const auth = useUserStore(({ auth }) => auth);

  if (!auth) return <NavLink to={ROUTES.profile.path}>Профиль</NavLink>;

  return auth.role === "user" ? (
    <NavLink to={ROUTES.profile.path}>Профиль</NavLink>
  ) : (
    <NavLink to={ROUTES.admin.path}>Админ-панель</NavLink>
  );
};
