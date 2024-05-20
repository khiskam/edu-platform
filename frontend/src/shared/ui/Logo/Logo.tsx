import { useTheme } from "@emotion/react";
import { Flex, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { GAP } from "@/shared/theme";

import LogoIcon from "./logo.svg?react";
import { icon, text } from "./styled";

export const Logo = () => {
  const theme = useTheme();

  return (
    <NavLink to="/">
      <Flex align="center" gap={GAP[8]} justify="space-between">
        <LogoIcon className={icon(theme)} />
        <Typography.Text strong className={text(theme)}>
          УМНЯША
        </Typography.Text>
      </Flex>
    </NavLink>
  );
};
