import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";

import { Container, Logo } from "@/components";

import { unauthLinks } from "./constants";
import { inner, menu } from "./styled";

export const Header = () => {
  const location = useLocation();

  return (
    <Layout.Header>
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
