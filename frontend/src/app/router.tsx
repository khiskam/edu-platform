import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Admin, Main, SignIn, SignUp, User } from "@/pages";
import { ROUTES } from "@/shared";

import { Layout } from "./Layout";

const {
  CreateCategory,
  CreateLesson,
  CreateTask,
  UpdateCategory,
  UpdateLesson,
  UpdateTask,
  Admin: AdminPanel,
} = Admin;

const { Profile } = User;

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
            path: ROUTES.main.name,
            element: <AdminPanel />,
          },
          {
            path: ROUTES.categories.name,
            children: [
              {
                path: ROUTES.main.name,
                element: <Admin.Categories />,
              },
              {
                path: "create",
                element: <CreateCategory />,
              },
              {
                path: ":categoryId/edit",
                element: <UpdateCategory />,
              },
              {
                path: `:categoryId/${ROUTES.lessons.name}`,
                children: [
                  {
                    path: ROUTES.main.name,
                    element: <Admin.Lessons />,
                  },
                  {
                    path: `create`,
                    element: <CreateLesson />,
                  },
                  {
                    path: `:lessonId/edit`,
                    element: <UpdateLesson />,
                  },
                ],
              },
            ],
          },
          {
            path: `${ROUTES.lessons.name}/:lessonId/tasks`,
            children: [
              {
                path: ROUTES.main.name,
                element: <Admin.Tasks />,
              },
              {
                path: "create",
                element: <CreateTask />,
              },
              {
                path: ":taskId/edit",
                element: <UpdateTask />,
              },
            ],
          },
        ],
      },

      {
        path: ROUTES.profile.name,
        children: [
          {
            path: ROUTES.main.name,
            element: <Profile />,
          },
          {
            path: ROUTES.categories.name,
            children: [
              {
                path: ROUTES.main.name,
                element: <User.Categories />,
              },
              {
                path: `:categoryId/${ROUTES.lessons.name}`,
                children: [
                  {
                    path: ROUTES.main.name,
                    element: <User.Lessons />,
                  },
                  {
                    path: ":lessonId",
                    element: <User.Lesson />,
                  },
                ],
              },
            ],
          },
          {
            path: `${ROUTES.lessons.name}/:lessonId/tasks`,
            children: [
              {
                path: ROUTES.main.name,
                element: <User.Tasks />,
              },
              {
                path: ":userId",
                element: <User.Task />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routesList);
