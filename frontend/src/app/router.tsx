import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Admin, Main, SignIn, SignUp } from "@/pages";
import { ROUTES } from "@/shared";

import { Layout } from "./Layout";

const {
  // Categories,
  CreateCategory,
  CreateLesson,
  CreateTask,
  UpdateCategory,
  UpdateLesson,
  UpdateTask,
} = Admin;

export const routesList: RouteObject[] = [
  {
    path: ROUTES.main.name,
    element: <Layout />,
    children: [
      {
        path: ROUTES.main.name,
        element: <Main />,
      },
      {
        path: ROUTES.signin.name,
        element: <SignIn />,
      },
      {
        path: ROUTES.signup.name,
        element: <SignUp />,
      },
      {
        path: ROUTES.admin.name,
        children: [
          {
            path: ROUTES.categories.name,
            children: [
              // {
              //   path: ROUTES.main.name,
              //   element: <Categories />,
              // },
              {
                path: "create",
                element: <CreateCategory />,
              },
              {
                path: ":id/edit",
                element: <UpdateCategory />,
              },
            ],
          },
          {
            path: ROUTES.tasks.name,
            children: [
              // {
              //   path: ROUTES.main.name,
              //   element: <Admin.Tasks />,
              // },
              {
                path: "create",
                element: <CreateTask />,
              },
              {
                path: ":id/edit",
                element: <UpdateTask />,
              },
            ],
          },
          {
            path: ROUTES.lessons.name,
            children: [
              // {
              //   path: ROUTES.main.name,
              //   element: <Admin.Lessons />,
              // },
              {
                path: `create`,
                element: <CreateLesson />,
              },
              {
                path: `:id/edit`,
                element: <UpdateLesson />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routesList);
