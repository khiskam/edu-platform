import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "@/assets/icons/logo.svg?react";
import { Container } from "@/components";
import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

import { AUTH_NAV_LINKS, UNAUTH_NAV_LINKS } from "./constants";
import { inner, logo, menu } from "./styled";

export const Header = () => {
  const location = useLocation();
  const auth = useUserStore(({ auth }) => auth);

  return (
    <Layout.Header>
      <Container>
        <div className={inner}>
          <NavLink to={ROUTES.main.path} className={logo}>
            <Logo height={24} />
          </NavLink>

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
