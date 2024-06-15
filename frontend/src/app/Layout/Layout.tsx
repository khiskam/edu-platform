import { Outlet, useLocation } from "react-router-dom";

import { Container, Footer, Header } from "@/components";
import { ROUTES } from "@/shared/routes";
import { MessageProvider } from "@/widgets";

import { Breadcrumb } from "../Breadcrumb";
import { ContentContainer, LayoutContainer, OutletContainer } from "./styled";

const PAGES_WITHOUT_BREADCRUMB = [ROUTES.main.path, ROUTES.signin.path, ROUTES.signup.path];

export const Layout = () => {
  const location = useLocation();
  const needBreadcrumb = !PAGES_WITHOUT_BREADCRUMB.includes(`${location.pathname}`);

  return (
    <LayoutContainer>
      <MessageProvider />
      <Header />
      <ContentContainer isBackground={!PAGES_WITHOUT_BREADCRUMB.includes(location.pathname)}>
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
