import { Outlet, useLocation } from "react-router-dom";

import { Container, Footer, Header } from "@/components";
import { ROUTES } from "@/shared/constants";

import { Breadcrumb } from "../Breadcrumb";
import { ContentContainer, LayoutContainer, OutletContainer } from "./styled";

const PAGES_WITHOUT_BREADCRUMB = [ROUTES.main, ROUTES.signin, ROUTES.signup];

export const Layout = () => {
  const location = useLocation();
  const needBreadcrumb = !PAGES_WITHOUT_BREADCRUMB.includes(location.pathname);

  return (
    <LayoutContainer>
      <Header />
      <ContentContainer>
        {needBreadcrumb ? (
          <Container>
            <Breadcrumb />
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
