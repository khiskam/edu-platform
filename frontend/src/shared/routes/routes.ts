export const ROUTES = {
  main: {
    name: "",
    path: "/",
  },
  signin: {
    name: "signin",
    path: "/signin",
  },
  signup: {
    name: "signup",
    path: "/signup",
  },
  categories: {
    name: "categories",
    path: "/categories",
  },
  tasks: {
    name: "tasks",
    path: "/tasks",
  },
  lessons: {
    name: "lessons",
    path: "/lessons",
  },
  profile: {
    name: "profile",
    path: "/profile",
  },
  admin: {
    name: "admin",
    path: "/admin",
  },
  create: {
    name: "create",
    path: "/create",
  },
  edit: {
    name: "edit",
    path: "/edit",
  },
};

export const ROUTES_TITLE: Omit<
  Record<keyof typeof ROUTES, string>,
  "main" | "signin" | "signup" | "signout"
> = {
  categories: "Категории",
  tasks: "Задания",
  lessons: "Занятия",
  admin: "Админ-панель",
  profile: "Профиль",
  create: "Добавить",
  edit: "Редактировать",
};

export type RoutesTitleKeys = keyof typeof ROUTES_TITLE;
