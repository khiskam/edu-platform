import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { ConfigProvider, theme } from "antd";

import { config } from "../theme";
import { ThemeProviderProps } from "./types";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ConfigProvider theme={config}>
      <Provider>{children}</Provider>
    </ConfigProvider>
  );
};

export const Provider = ({ children }: ThemeProviderProps) => {
  const { token } = theme.useToken();

  return <StyledThemeProvider theme={token}>{children}</StyledThemeProvider>;
};
