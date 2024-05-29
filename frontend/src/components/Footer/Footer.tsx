import { useTheme } from "@emotion/react";
import { Flex, Layout, Typography } from "antd";
import { NavLink } from "react-router-dom";

import Logo from "@/assets/icons/logo.svg?react";
import { Container } from "@/components";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

import { footer, logo } from "./styled";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Layout.Footer className={footer(theme)}>
      <Container>
        <Flex align="center" justify="space-between" gap={GAP[12]} wrap="wrap">
          <NavLink to={ROUTES.main.path} className={logo}>
            <Logo height={24} />
          </NavLink>

          <Typography.Text strong>&#169; Copyright EDUBOARD</Typography.Text>
        </Flex>
      </Container>
    </Layout.Footer>
  );
};
