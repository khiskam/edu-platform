import "antd/dist/reset.css";
import "@/shared/config";

import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "../shared/theme";
import { router } from "./router";

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
