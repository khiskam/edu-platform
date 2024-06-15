import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { User } from "@/shared/store";

import { AUTH_NAV_LINKS, UNAUTH_NAV_LINKS } from "./constants";

export const getLinks = (auth?: User["auth"]) => {
  if (!auth) {
    return UNAUTH_NAV_LINKS;
  }

  return [
    ...AUTH_NAV_LINKS.slice(0, AUTH_NAV_LINKS.length - 1),
    auth.role === "admin"
      ? { key: ROUTES.admin.path, label: <NavLink to={ROUTES.admin.path}>Админ-панель</NavLink> }
      : null,
    ...AUTH_NAV_LINKS.slice(AUTH_NAV_LINKS.length - 1),
  ];
};
