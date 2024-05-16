import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared";

import { ProfileLink } from "./ProfileLink";
import { SignOutLink } from "./SignOutLink";
import { getUserKey } from "./utils";

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
    key: getUserKey(),
    label: <ProfileLink />,
  },
  {
    key: "signout",
    label: <SignOutLink />,
  },
];
