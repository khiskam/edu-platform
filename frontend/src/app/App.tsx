import "antd/dist/reset.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "@/shared/api";
import { ThemeProvider } from "@/shared/theme";
import { AuthProvider } from "@/widgets";

import { router } from "./router";

export const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
