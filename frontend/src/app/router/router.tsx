import { createBrowserRouter } from "react-router-dom";

import {
  Admin,
  LessonPage,
  LessonsPage,
  SignInPage,
  SignUpPage,
  TaskPage,
  TasksPage,
} from "@/pages";
import { ROUTES_NAME } from "@/shared/constants";

import { Layout } from "./Layout";

const {
  CategoriesPage,
  CreateCategoryPage,
  CreateLessonPage,
  CreateTaskPage,
  UpdateCategoryPage,
  UpdateLessonPage,
  UpdateTaskPage,
} = Admin;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: ROUTES_NAME.signin,
        element: <SignInPage />,
      },
      {
        path: ROUTES_NAME.signup,
        element: <SignUpPage />,
      },
      {
        path: ROUTES_NAME.tasks,
        children: [
          {
            path: ROUTES_NAME.main,
            element: <TasksPage />,
          },
          {
            path: ":id",
            element: <TaskPage />,
          },
        ],
      },
      {
        path: ROUTES_NAME.lessons,
        children: [
          {
            path: ROUTES_NAME.main,
            element: <LessonsPage />,
          },
          {
            path: ":id",
            element: <LessonPage />,
          },
        ],
      },
      {
        path: ROUTES_NAME.admin,
        children: [
          {
            path: ROUTES_NAME.categories,
            children: [
              {
                path: ROUTES_NAME.main,
                element: <CategoriesPage />,
              },
              {
                path: "create",
                element: <CreateCategoryPage />,
              },
              {
                path: ":id/edit",
                element: <UpdateCategoryPage />,
              },
            ],
          },
          {
            path: ROUTES_NAME.tasks,
            children: [
              {
                path: ROUTES_NAME.main,
                element: <Admin.TasksPage />,
              },
              {
                path: "create",
                element: <CreateTaskPage />,
              },
              {
                path: ":id/edit",
                element: <UpdateTaskPage />,
              },
            ],
          },
          {
            path: ROUTES_NAME.lessons,
            children: [
              {
                path: ROUTES_NAME.main,
                element: <Admin.LessonsPage />,
              },
              {
                path: `create`,
                element: <CreateLessonPage />,
              },
              {
                path: `:id/edit`,
                element: <UpdateLessonPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
