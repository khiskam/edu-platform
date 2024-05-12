import { Breadcrumb } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import { Container, Footer, Header } from "@/components";
import { ROUTES } from "@/shared/constants";

import { ContentContainer, LayoutContainer, OutletContainer } from "./styled";

export const Layout = () => {
  const location = useLocation();

  const needBreadCrumb = !(
    location.pathname === ROUTES.main ||
    location.pathname === ROUTES.signin ||
    location.pathname === ROUTES.signup
  );

  return (
    <LayoutContainer>
      <Header />
      <ContentContainer>
        {needBreadCrumb ? (
          <Container>
            <Breadcrumb items={[{ title: "ds" }]} />
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
