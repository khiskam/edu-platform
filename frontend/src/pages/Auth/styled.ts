import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { GAP, PADDING } from "@/shared/theme";

import { LayoutProps } from "./types";

export const Layout = styled.div<LayoutProps>`
  align-items: center;
  display: grid;

  gap: ${GAP[64]}px;
  grid-template-columns: ${({ formPosition = "left" }) =>
    formPosition === "left" ? "2fr 1px 3fr" : "3fr 1px 2fr"};

  @media screen and (max-width: ${({ theme }) => theme.screenXXL}px) {
    grid-template-columns: 1fr 1px 1fr;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    gap: 32px;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    grid-template-columns: 1fr;
  }
`;

export const Form = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    padding: ${PADDING[32]}px;

    border-radius: ${({ theme }) => theme.borderRadiusLG}px;
    box-shadow: rgba(10, 108, 231, 0.12) 0px 8px 16px;
  }
`;

export const divider = css`
  height: 100%;
`;
