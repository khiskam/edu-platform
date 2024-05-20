import { Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { Container } from "@/shared/ui";
import { Footer, Header } from "@/widgets";

import { Breadcrumb } from "../Breadcrumb";
import { ContentContainer, LayoutContainer, OutletContainer } from "./styled";

const PAGES_WITHOUT_BREADCRUMB = [ROUTES.main.path, ROUTES.signin.path, ROUTES.signup.path];

export const Layout = () => {
  const location = useLocation();
  const needBreadcrumb = !PAGES_WITHOUT_BREADCRUMB.includes(`${location.pathname}`);

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
