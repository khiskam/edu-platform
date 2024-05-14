import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, BreadcrumbProps } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { Container, Footer, Header } from "@/components";
import { ROUTES } from "@/shared/constants";

import { ContentContainer, LayoutContainer, OutletContainer } from "./styled";

const PAGES_WITHOUT_BREADCRUMB = [ROUTES.main, ROUTES.signin, ROUTES.signup];

const nav: BreadcrumbProps["items"] = [
  {
    title: (
      <NavLink to={ROUTES.main}>
        <HomeOutlined />
      </NavLink>
    ),
  },
];

export const Layout = () => {
  const location = useLocation();

  const needBreadcrumb = !PAGES_WITHOUT_BREADCRUMB.includes(location.pathname);

  return (
    <LayoutContainer>
      <Header />
      <ContentContainer>
        {needBreadcrumb ? (
          <Container>
            <Breadcrumb items={nav} />
          </Container>
        ) : null}
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </ContentContainer>
      <Footer />
    </LayoutContainer>
  );
};
