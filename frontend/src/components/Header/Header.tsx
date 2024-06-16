import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "@/assets/icons/logo.svg";
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
            <img src={Logo} style={{ height: "24px" }} />
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
