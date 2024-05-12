import { Global, ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { ConfigProvider, theme } from "antd";

import { config } from "../theme";
import { global } from "./styled";
import { ThemeProviderProps } from "./types";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <ConfigProvider theme={config}>
      <Global styles={global} />
      <Provider>{children}</Provider>
    </ConfigProvider>
  );
};

export const Provider = ({ children }: ThemeProviderProps) => {
  const { token } = theme.useToken();

  return <StyledThemeProvider theme={token}>{children}</StyledThemeProvider>;
};
