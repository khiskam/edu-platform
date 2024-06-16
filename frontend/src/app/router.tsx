import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Crumbs } from "@/components";
import { Admin, Auth, Main, User } from "@/pages";
import { ROUTES } from "@/shared/routes";
import { AdminProtectedRoutes, AuthProtectedRoutes, UnauthProtectedRoutes } from "@/widgets";

import { Layout } from "./Layout";

export const routesList: RouteObject[] = [
  {
    path: ROUTES.main.name,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        element: <UnauthProtectedRoutes />,
        children: [
          {
            path: ROUTES.signin.name,
            element: <Auth.SignIn />,
          },
          {
            path: ROUTES.signup.name,
            element: <Auth.SignUp />,
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
                index: true,
                element: <Admin.Panel />,
              },
              {
                path: ROUTES.users.name,
                children: [
                  {
                    index: true,
                    element: <Admin.Users />,
                  },
                  {
                    path: ":userId",
                    element: <Admin.User />,
                    handle: {
                      crumb: <Crumbs.User />,
                    },
                  },
                ],
              },
              {
                path: ROUTES.categories.name,
                children: [
                  {
                    index: true,
                    element: <Admin.Categories />,
                  },
                  {
                    path: ROUTES.create.name,
                    element: <Admin.CreateCategory />,
                  },
                  {
                    path: ":categoryId",
                    handle: {
                      crumb: <Crumbs.Category />,
                    },
                    children: [
                      {
                        index: true,
                        element: <Admin.Category />,
                      },
                      {
                        path: ROUTES.edit.name,
                        element: <Admin.UpdateCategory />,
                      },
                      {
                        path: ROUTES.lessons.name,
                        children: [
                          {
                            index: true,
                            element: <Admin.Lessons />,
                          },
                          {
                            path: ROUTES.create.name,
                            element: <Admin.CreateLesson />,
                          },
                          {
                            path: ":lessonId",
                            handle: {
                              crumb: <Crumbs.Lesson />,
                            },
                            children: [
                              {
                                index: true,
                                element: <Admin.Lesson />,
                              },
                              {
                                path: ROUTES.edit.name,
                                element: <Admin.UpdateLesson />,
                              },
                              {
                                path: ROUTES.tasks.name,
                                children: [
                                  {
                                    index: true,
                                    element: <Admin.Tasks />,
                                  },
                                  {
                                    path: ROUTES.create.name,
                                    element: <Admin.CreateTask />,
                                  },
                                  {
                                    path: ":taskId",
                                    handle: {
                                      crumb: <Crumbs.Task />,
                                    },
                                    children: [
                                      {
                                        index: true,
                                        element: <Admin.Task />,
                                      },
                                      {
                                        path: ROUTES.edit.name,
                                        element: <Admin.UpdateTask />,
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
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
        element: <AuthProtectedRoutes />,
        children: [
          {
            path: ROUTES.account.name,
            children: [
              {
                index: true,
                element: <User.Account />,
              },
              {
                path: ROUTES.profile.name,
                element: <User.Profile />,
              },
              {
                path: ROUTES.categories.name,
                children: [
                  {
                    index: true,
                    element: <User.Categories />,
                  },
                  {
                    path: ":categoryId",
                    handle: {
                      crumb: <Crumbs.Category />,
                    },
                    children: [
                      {
                        index: true,
                        element: <User.Category />,
                      },
                      {
                        path: ROUTES.lessons.name,
                        children: [
                          {
                            index: true,
                            element: <User.Lessons />,
                          },
                          {
                            path: ":lessonId",
                            handle: {
                              crumb: <Crumbs.Lesson />,
                            },
                            children: [
                              {
                                index: true,
                                element: <User.Lesson />,
                              },
                              {
                                path: ROUTES.tasks.name,
                                children: [
                                  {
                                    index: true,
                                    element: <User.Tasks />,
                                  },
                                  {
                                    path: ":taskId",
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
