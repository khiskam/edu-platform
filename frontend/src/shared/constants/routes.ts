export const ROUTES_NAME = {
  main: "",
  signin: "signin",
  signup: "signup",
  signout: "signout",
  categories: "categories",
  tasks: "tasks",
  lessons: "lessons",
  admin: "admin",
  create: "create",
  edit: "edit",
} as const;

type RoutesRecord = Record<keyof typeof ROUTES_NAME, string>;

export const ROUTES: RoutesRecord = (() => {
  return Object.fromEntries(Object.entries(ROUTES_NAME).map(([key, value]) => [key, `/${value}`]));
})() as RoutesRecord;

export const ROUTES_TITLE: Omit<
  Record<keyof typeof ROUTES_NAME, string>,
  "main" | "signin" | "signup" | "signout"
> = {
  categories: "Категории",
  tasks: "Задания",
  lessons: "Занятия",
  admin: "Админ-панель",
  create: "Добавить",
  edit: "Редактировать",
};

export type RoutesTitleKeys = keyof typeof ROUTES_TITLE;
