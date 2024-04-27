import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/components";

import { LayoutContainer, OutletContainer } from "./styled";

export const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <Footer />
    </LayoutContainer>
  );
};
