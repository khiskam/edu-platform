import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Auth, Main, User } from "@/pages";
import { ROUTES } from "@/shared/routes";
import { AuthProtectedRoutes, UnauthProtectedRoutes } from "@/widgets";

import { Layout } from "./Layout";

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
            element: <Auth.SignIn />,
          },
          {
            path: ROUTES.signup.name,
            element: <Auth.SignUp />,
          },
        ],
      },
      // {
      //   element: <AdminProtectedRoutes />,
      //   children: [
      //     {
      //       path: ROUTES.admin.name,
      //       children: [
      //         {
      //           path: ROUTES.main.name,
      //           element: <AdminPanel />,
      //         },
      //         {
      //           path: ROUTES.users.name,
      //           element: <></>,
      //         },
      //         {
      //           path: ROUTES.categories.name,
      //           children: [
      //             {
      //               path: ROUTES.main.name,
      //               element: <Admin.Categories />,
      //             },
      //             {
      //               path: "create",
      //               element: <CreateCategory />,
      //             },
      //             {
      //               path: ":categoryId",
      //               children: [
      //                 {
      //                   path: ROUTES.main.name,
      //                   element: <Admin.Category />,
      //                 },
      //                 {
      //                   path: ROUTES.edit.name,
      //                   element: <UpdateCategory />,
      //                 },
      //                 {
      //                   path: ROUTES.lessons.name,
      //                   children: [
      //                     {
      //                       path: ROUTES.main.name,
      //                       element: <Admin.Lessons></Admin.Lessons>,
      //                     },
      //                     {
      //                       path: "create",
      //                       element: <CreateLesson />,
      //                     },
      //                     {
      //                       path: ":lessonId",
      //                       children: [
      //                         {
      //                           path: ROUTES.main.name,
      //                           element: <Admin.Lesson></Admin.Lesson>,
      //                         },
      //                         {
      //                           path: ROUTES.edit.name,
      //                           element: <UpdateLesson />,
      //                         },
      //                         {
      //                           path: ROUTES.tasks.name,
      //                           children: [
      //                             {
      //                               path: ROUTES.main.name,
      //                               element: <Admin.Tasks />,
      //                             },
      //                             {
      //                               path: "create",
      //                               element: <CreateTask />,
      //                             },
      //                             {
      //                               path: ":taskId",
      //                               children: [
      //                                 {
      //                                   path: ROUTES.main.name,
      //                                   element: <Admin.Task></Admin.Task>,
      //                                 },
      //                                 {
      //                                   path: "edit",
      //                                   element: <UpdateTask />,
      //                                 },
      //                               ],
      //                             },
      //                           ],
      //                         },
      //                       ],
      //                     },
      //                   ],
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },

      {
        element: <AuthProtectedRoutes />,
        children: [
          {
            path: ROUTES.account.name,
            children: [
              {
                path: ROUTES.main.name,
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
                    path: ROUTES.main.name,
                    element: <User.Categories />,
                  },
                  {
                    path: ":categoryId",
                    children: [
                      {
                        path: ROUTES.main.name,
                        element: <User.Category />,
                      },
                      {
                        path: ROUTES.lessons.name,
                        children: [
                          {
                            path: ROUTES.main.name,
                            element: <User.Lessons />,
                          },
                          {
                            path: ":lessonId",
                            children: [
                              {
                                path: ROUTES.main.name,
                                element: <User.Lesson />,
                              },
                              {
                                path: ROUTES.tasks.name,
                                element: <User.Tasks />,
                              },
                              {
                                path: `${ROUTES.tasks.name}/:taskId`,
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
];

export const router = createBrowserRouter(routesList);
