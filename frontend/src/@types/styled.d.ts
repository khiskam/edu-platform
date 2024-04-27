import "@emotion/react";

import { theme } from "antd";

const { token } = theme.useToken();

type AntdTheme = typeof token;

declare module "@emotion/react" {
  export interface Theme extends AntdTheme {}
}
