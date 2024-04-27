import { createBrowserRouter } from "react-router-dom";

import { SignInPage, SignUpPage } from "@/pages";
import { ROUTES } from "@/shared/constants";

import { Layout } from "./Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: ROUTES.signin,
        element: <SignInPage />,
      },
      {
        path: ROUTES.signup,
        element: <SignUpPage />,
      },
    ],
  },
]);
