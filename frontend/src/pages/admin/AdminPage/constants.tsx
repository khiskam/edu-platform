import { AppstoreOutlined, BarsOutlined, FormOutlined } from "@ant-design/icons";

import { ROUTES } from "@/shared/constants";

import { CardProps } from "./types";

export const ADMIN: CardProps[] = [
  { title: "Категории", icon: <AppstoreOutlined />, route: `${ROUTES.admin}${ROUTES.categories}` },
  { title: "Занятия", icon: <BarsOutlined />, route: `${ROUTES.admin}${ROUTES.lessons}` },
  { title: "Задания", icon: <FormOutlined />, route: `${ROUTES.admin}${ROUTES.tasks}` },
];
