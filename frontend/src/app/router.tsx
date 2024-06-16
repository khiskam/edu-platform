import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Crumbs } from "@/components";
import { ROUTES } from "@/shared/routes";

export const routesList: RouteObject[] = [
  {
    path: ROUTES.main.name,
    async lazy() {
      const { Layout } = await import("./Layout");
      return { Component: Layout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { Main } = await import("@/pages/Main");
          return { Component: Main };
        },
      },
      {
        async lazy() {
          const { UnauthProtectedRoutes } = await import("@/widgets/ProtectedRoutes");
          return { Component: UnauthProtectedRoutes };
        },
        children: [
          {
            path: ROUTES.signin.name,
            async lazy() {
              const { SignIn } = await import("@/pages/Auth/SignIn");
              return { Component: SignIn };
            },
          },
          {
            path: ROUTES.signup.name,
            async lazy() {
              const { SignUp } = await import("@/pages/Auth/SignUp");
              return { Component: SignUp };
            },
          },
        ],
      },
      {
        async lazy() {
          const { AdminProtectedRoutes } = await import("@/widgets/ProtectedRoutes");
          return { Component: AdminProtectedRoutes };
        },
        children: [
          {
            path: ROUTES.admin.name,
            children: [
              {
                index: true,
                async lazy() {
                  const { Panel } = await import("@/pages/Admin/Panel");
                  return { Component: Panel };
                },
              },
              {
                path: ROUTES.users.name,
                children: [
                  {
                    index: true,
                    async lazy() {
                      const { Users } = await import("@/pages/Admin/Users");
                      return { Component: Users };
                    },
                  },
                  {
                    path: ":userId",
                    async lazy() {
                      const { User } = await import("@/pages/Admin/User");
                      return { Component: User };
                    },
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
                    async lazy() {
                      const { Categories } = await import("@/pages/Admin/Categories");
                      return { Component: Categories };
                    },
                  },
                  {
                    path: ROUTES.create.name,
                    async lazy() {
                      const { CreateCategory } = await import("@/pages/Admin/CreateCategory");
                      return { Component: CreateCategory };
                    },
                  },
                  {
                    path: ":categoryId",
                    handle: {
                      crumb: <Crumbs.Category />,
                    },
                    children: [
                      {
                        index: true,
                        async lazy() {
                          const { Category } = await import("@/pages/Admin/Category");
                          return { Component: Category };
                        },
                      },
                      {
                        path: ROUTES.edit.name,
                        async lazy() {
                          const { UpdateCategory } = await import("@/pages/Admin/UpdateCategory");
                          return { Component: UpdateCategory };
                        },
                      },
                      {
                        path: ROUTES.lessons.name,
                        children: [
                          {
                            index: true,
                            async lazy() {
                              const { Lessons } = await import("@/pages/Admin/Lessons");
                              return { Component: Lessons };
                            },
                          },
                          {
                            path: ROUTES.create.name,
                            async lazy() {
                              const { CreateLesson } = await import("@/pages/Admin/CreateLesson");
                              return { Component: CreateLesson };
                            },
                          },
                          {
                            path: ":lessonId",
                            handle: {
                              crumb: <Crumbs.Lesson />,
                            },
                            children: [
                              {
                                index: true,
                                async lazy() {
                                  const { Lesson } = await import("@/pages/Admin/Lesson");
                                  return { Component: Lesson };
                                },
                              },
                              {
                                path: ROUTES.edit.name,
                                async lazy() {
                                  const { UpdateLesson } = await import(
                                    "@/pages/Admin/UpdateLesson"
                                  );
                                  return { Component: UpdateLesson };
                                },
                              },
                              {
                                path: ROUTES.tasks.name,
                                children: [
                                  {
                                    path: ROUTES.main.name,
                                    async lazy() {
                                      const { Tasks } = await import("@/pages/Admin/Tasks");
                                      return { Component: Tasks };
                                    },
                                  },
                                  {
                                    path: ROUTES.create.name,
                                    async lazy() {
                                      const { CreateTask } = await import(
                                        "@/pages/Admin/CreateTask"
                                      );
                                      return { Component: CreateTask };
                                    },
                                  },
                                  {
                                    path: ":taskId",
                                    handle: {
                                      crumb: <Crumbs.Task />,
                                    },
                                    children: [
                                      {
                                        index: true,
                                        async lazy() {
                                          const { Task } = await import("@/pages/Admin/Task");
                                          return { Component: Task };
                                        },
                                      },
                                      {
                                        path: ROUTES.edit.name,
                                        async lazy() {
                                          const { UpdateTask } = await import(
                                            "@/pages/Admin/UpdateTask"
                                          );
                                          return { Component: UpdateTask };
                                        },
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
        async lazy() {
          const { AuthProtectedRoutes } = await import("@/widgets/ProtectedRoutes");
          return { Component: AuthProtectedRoutes };
        },
        children: [
          {
            path: ROUTES.account.name,
            children: [
              {
                index: true,
                async lazy() {
                  const { Account } = await import("@/pages/User/Account");
                  return { Component: Account };
                },
              },
              {
                path: ROUTES.profile.name,
                async lazy() {
                  const { Profile } = await import("@/pages/User/Profile");
                  return { Component: Profile };
                },
              },
              {
                path: ROUTES.categories.name,
                children: [
                  {
                    index: true,
                    async lazy() {
                      const { Categories } = await import("@/pages/User/Categories");
                      return { Component: Categories };
                    },
                  },
                  {
                    path: ":categoryId",
                    handle: {
                      crumb: <Crumbs.Category />,
                    },
                    children: [
                      {
                        index: true,
                        async lazy() {
                          const { Category } = await import("@/pages/User/Category");
                          return { Component: Category };
                        },
                      },
                      {
                        path: ROUTES.lessons.name,
                        children: [
                          {
                            index: true,
                            async lazy() {
                              const { Lessons } = await import("@/pages/User/Lessons");
                              return { Component: Lessons };
                            },
                          },
                          {
                            path: ":lessonId",
                            handle: {
                              crumb: <Crumbs.Lesson />,
                            },
                            children: [
                              {
                                index: true,
                                async lazy() {
                                  const { Lesson } = await import("@/pages/User/Lesson");
                                  return { Component: Lesson };
                                },
                              },
                              {
                                path: ROUTES.tasks.name,
                                children: [
                                  {
                                    index: true,
                                    async lazy() {
                                      const { Tasks } = await import("@/pages/User/Tasks");
                                      return { Component: Tasks };
                                    },
                                  },
                                  {
                                    path: ":taskId",
                                    async lazy() {
                                      const { Task } = await import("@/pages/User/Task");
                                      return { Component: Task };
                                    },
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
