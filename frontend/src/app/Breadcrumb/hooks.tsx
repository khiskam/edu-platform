import HomeOutlined from "@ant-design/icons/HomeOutlined";
import { BreadcrumbProps } from "antd/es/breadcrumb";
import { NavLink, useLocation, useMatches } from "react-router-dom";

import { ROUTES_TITLE, RoutesTitleKeys } from "@/shared/routes";

import { HandleType } from "./types";

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
  const matches = useMatches();
  const location = useLocation();
  const routes = location.pathname.split("/");

  const items: BreadcrumbProps["items"] = [...initValue];
  const paths = location.pathname.split("/");
  let currentLink: string = "";
  let title: React.ReactNode;

  console.log(matches);

  for (let i = 1; i < paths.length; ++i) {
    currentLink += `/${paths[i]}`;

    const match = matches.find((value) => value.pathname === currentLink);

    if (match?.handle && (match.handle as HandleType).crumb) {
      title = (match.handle as HandleType).crumb;
    } else {
      const route = routes[i];
      title = isRoutesTitle(route) ? ROUTES_TITLE[route] : route;
    }

    items.push({
      title: i === routes.length - 1 ? title : <NavLink to={currentLink}>{title}</NavLink>,
    });
  }

  return items;
};
