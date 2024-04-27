import { useTheme } from "@emotion/react";
import { Flex, Layout, Typography } from "antd";

import { Container, Logo } from "@/components";
import { GAP } from "@/shared/constants";

import { footer } from "./styled";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Layout.Footer className={footer(theme)}>
      <Container>
        <Flex align="center" justify="space-between" gap={GAP[12]} wrap="wrap">
          <Logo />

          <Typography.Text>&#169; Copyright РАЗВИТИЕ</Typography.Text>
        </Flex>
      </Container>
    </Layout.Footer>
  );
};
