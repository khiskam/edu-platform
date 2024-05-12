export const ROUTES_NAME = {
  main: "",
  signin: "signin",
  signup: "signup",
  signout: "signout",
  categories: "categories",
  tasks: "tasks",
  lessons: "lessons",
  admin: "admin",
} as const;

type RoutesRecord = Record<keyof typeof ROUTES_NAME, string>;

export const ROUTES: RoutesRecord = (() => {
  return Object.fromEntries(
    Object.entries(ROUTES_NAME).map(([key, value]) => [key, `/${value}`])
  );
})() as RoutesRecord;
