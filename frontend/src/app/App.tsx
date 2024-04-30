import "antd/dist/reset.css";
import "@/shared/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "../shared/theme";
import { router } from "./router";

const client = new QueryClient();

export const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
