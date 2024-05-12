import { useTheme } from "@emotion/react";
import { Flex, Typography } from "antd";
import { NavLink } from "react-router-dom";

import LogoIcon from "@/shared/assets/logo.svg?react";
import { GAP } from "@/shared/constants";

import { icon, text } from "./styled";

export const Logo = () => {
  const theme = useTheme();

  return (
    <NavLink to="/">
      <Flex align="center" gap={GAP[8]} justify="space-between">
        <LogoIcon className={icon(theme)} />
        <Typography.Text strong className={text(theme)}>
          РАЗВИТИЕ
        </Typography.Text>
      </Flex>
    </NavLink>
  );
};
