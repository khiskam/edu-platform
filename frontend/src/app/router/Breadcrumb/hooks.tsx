import { HomeOutlined } from "@ant-design/icons";
import { BreadcrumbProps } from "antd";
import { matchRoutes, NavLink, useLocation } from "react-router-dom";

import { ROUTES_TITLE, RoutesTitleKeys } from "@/shared/constants";

import { routesList } from "../routesList";

const initValue = [
  {
    title: (
      <NavLink to="/">
        <HomeOutlined />
      </NavLink>
    ),
  },
];

const isRoutesTitle = (route: string): route is RoutesTitleKeys => {
  return route in ROUTES_TITLE;
};

export const useBreadcrumb = (): BreadcrumbProps["items"] => {
  const location = useLocation();
  const routes = location.pathname.split("/");

  const items: BreadcrumbProps["items"] = [...initValue];
  let currentLink = "";

  for (let i = 1; i < routes.length; ++i) {
    currentLink += `/${routes[i]}`;

    if (!matchRoutes(routesList, currentLink)) {
      continue;
    }

    const route = routes[i];
    const title = isRoutesTitle(route) ? ROUTES_TITLE[route] : route;

    items.push({
      title: i === routes.length - 1 ? title : <NavLink to={currentLink}>{title}</NavLink>,
    });
  }

  return items;
};
