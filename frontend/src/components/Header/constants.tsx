import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

import { ProfileLink, SignOutLink } from "./components";

export const COMMON_NAV_LINKS: MenuProps["items"] = [
  {
    key: ROUTES.main.path,
    label: <NavLink to={ROUTES.main.path}>Главная</NavLink>,
  },
];

export const UNAUTH_NAV_LINKS: MenuProps["items"] = [
  ...COMMON_NAV_LINKS,
  {
    key: ROUTES.signin.path,
    label: <NavLink to={ROUTES.signin.path}>Войти</NavLink>,
  },
  {
    key: ROUTES.signup.path,
    label: <NavLink to={ROUTES.signup.path}>Регистрация</NavLink>,
  },
];

export const AUTH_NAV_LINKS = [
  ...COMMON_NAV_LINKS,
  {
    key: useUserStore.getState().auth?.role === "user" ? ROUTES.profile.path : ROUTES.admin.path,
    label: <ProfileLink />,
  },
  {
    key: "signout",
    label: <SignOutLink />,
  },
];
