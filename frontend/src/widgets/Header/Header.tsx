import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";

import { Container, Logo, useUserStore } from "@/shared";

import { AUTH_NAV_LINKS, UNAUTH_NAV_LINKS } from "./constants";
import { inner, menu } from "./styled";

export const Header = () => {
  const location = useLocation();
  const auth = useUserStore(({ auth }) => auth);

  console.log(location.pathname);

  return (
    <Layout.Header>
      <Container>
        <div className={inner}>
          <Logo />

          <Menu
            className={menu}
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={auth ? AUTH_NAV_LINKS : UNAUTH_NAV_LINKS}
          />
        </div>
      </Container>
    </Layout.Header>
  );
};
