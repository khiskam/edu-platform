import { useTheme } from "@emotion/react";
import { Flex, Layout, Typography } from "antd";

import { GAP } from "@/shared/theme";
import { Container, Logo } from "@/shared/ui";

import { footer } from "./styled";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Layout.Footer className={footer(theme)}>
      <Container>
        <Flex align="center" justify="space-between" gap={GAP[12]} wrap="wrap">
          <Logo />

          <Typography.Text>&#169; Copyright УМНЯША</Typography.Text>
        </Flex>
      </Container>
    </Layout.Footer>
  );
};
