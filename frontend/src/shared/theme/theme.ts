import { theme, ThemeConfig } from "antd";

import { COLORS, HEADER_HEIGHT } from "./constants";

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
    fontFamily: "Nunito",
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
      colorBorderSecondary: theme.getDesignToken().colorPrimary,
    },
    Collapse: {
      headerBg: "transparent",
      contentBg: "transparent",
      colorBorder: theme.getDesignToken()["blue-4"],
      colorIcon: theme.getDesignToken().blue4,
    },
    Checkbox: {
      borderRadiusSM: 4,
    },
    Statistic: {
      contentFontSize: 24,
      colorTextHeading: theme.getDesignToken().colorPrimary,
    },
    Carousel: {
      colorBgContainer: COLORS.orange,
    },
  },
} as const;
