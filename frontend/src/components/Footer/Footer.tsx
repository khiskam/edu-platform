import { useTheme } from "@emotion/react";
import Flex from "antd/es/flex";
import Layout from "antd/es/layout";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import Logo from "@/assets/icons/logo.svg";
import { Container } from "@/components";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

import { footer, logo } from "./styled";

export const Footer = () => {
  const theme = useTheme();

  console.log(Logo);

  return (
    <Layout.Footer className={footer(theme)}>
      <Container>
        <Flex align="center" justify="space-between" gap={GAP[12]} wrap="wrap">
          <NavLink to={ROUTES.main.path} className={logo}>
            <img src={Logo} alt="logo" style={{ height: "24px" }} />
          </NavLink>

          <Typography.Text strong>&#169; Copyright EDUBOARD</Typography.Text>
        </Flex>
      </Container>
    </Layout.Footer>
  );
};
