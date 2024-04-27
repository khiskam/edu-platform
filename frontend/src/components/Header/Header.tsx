import { useTheme } from "@emotion/react";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";

import { Container, Logo } from "@/components";

import { unauthLinks } from "./constants";
import { header, inner, menu } from "./styled";

export const Header = () => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Layout.Header className={header(theme)}>
      <Container>
        <div className={inner}>
          <Logo />

          <Menu
            className={menu}
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={unauthLinks}
          />
        </div>
      </Container>
    </Layout.Header>
  );
};
