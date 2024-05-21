import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Admin, Main, SignIn, SignUp, User } from "@/pages";
import { ROUTES } from "@/shared/routes";
import { AdminProtectedRoutes, AuthProtectedRoutes, UnauthProtectedRoutes } from "@/widgets";

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
        element: <UnauthProtectedRoutes />,
        children: [
          {
            path: ROUTES.signin.name,
            element: <SignIn />,
          },
          {
            path: ROUTES.signup.name,
            element: <SignUp />,
          },
        ],
      },

      {
        element: <AdminProtectedRoutes />,
        children: [
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
                    path: ":categoryId",
                    children: [
                      {
                        path: ROUTES.main.name,
                        element: <Admin.Category />,
                      },
                      {
                        path: ROUTES.edit.name,
                        element: <UpdateCategory />,
                      },
                      {
                        path: ROUTES.lessons.name,
                        children: [
                          {
                            path: ROUTES.main.name,
                            element: <Admin.Lessons></Admin.Lessons>,
                          },
                          {
                            path: "create",
                            element: <CreateLesson />,
                          },
                          {
                            path: ":lessonId",
                            children: [
                              {
                                path: ROUTES.main.name,
                                element: <></>,
                              },
                              {
                                path: ROUTES.edit.name,
                                element: <UpdateLesson />,
                              },
                            ],
                          },
                        ],
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
        ],
      },

      {
        element: <AuthProtectedRoutes />,
        children: [
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
    ],
  },
];

export const router = createBrowserRouter(routesList);
