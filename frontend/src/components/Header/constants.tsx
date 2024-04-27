import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

import { ROUTES } from "@/shared/constants";

const COMMON_NAV_LINKS = [
  {
    title: "Главная",
    route: ROUTES.main,
  },
];

const UNAUTH_NAV_LINKS = [
  ...COMMON_NAV_LINKS,
  {
    title: "Войти",
    route: ROUTES.signin,
  },
  {
    title: "Регистрация",
    route: ROUTES.signup,
  },
];

export const unauthLinks: MenuProps["items"] = UNAUTH_NAV_LINKS.map((item) => ({
  key: item.route,
  label: <NavLink to={item.route}>{item.title}</NavLink>,
}));
