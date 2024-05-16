import { theme, ThemeConfig } from "antd";

import { HEADER_HEIGHT } from "../constants";

export const config: ThemeConfig = {
  token: {
    colorPrimary: "#006ce7",
    colorInfo: "#2b6cb0",
    colorSuccess: "#38a169",
    colorWarning: "#d69e2e",
    colorTextBase: "#2d3748",
    fontSize: 16,
    colorBgContainer: "#ffffff",
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 16,
    fontSizeSM: 12,
    fontSizeLG: 20,
    fontSizeXL: 24,
    borderRadius: 8,
    borderRadiusLG: 16,
  },
  components: {
    Menu: {
      colorBgContainer: "transparent",
      itemPaddingInline: "20px 0",
      colorSplit: "transparent",
    },
    Layout: {
      headerBg: "#ffffff",
      footerBg: "#ffffff",
      bodyBg: "transparent",
      headerHeight: HEADER_HEIGHT,
      headerPadding: 0,
      footerPadding: 0,
    },
    Card: {
      colorBorderSecondary: theme.getDesignToken().colorBorder,
    },
    Checkbox: {
      borderRadiusSM: 4,
    },
  },
} as const;
