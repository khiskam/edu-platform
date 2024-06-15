import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "@/assets/icons/logo.svg?react";
import { Container } from "@/components";
import { ROUTES } from "@/shared/routes";
import { useUserStore } from "@/shared/store";

import { inner, logo, menu } from "./styled";
import { getLinks } from "./utils";

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
            items={getLinks(auth)}
          />
        </div>
      </Container>
    </Layout.Header>
  );
};
