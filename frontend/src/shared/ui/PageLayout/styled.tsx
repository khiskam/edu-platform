import styled from "@emotion/styled";

import { GAP, PADDING } from "@/shared/theme";

import { PageLayoutProps } from "./types";

export const PageLayout = styled.div<PageLayoutProps>`
  display: flex;
  flex-direction: column;
  height: ${({ height = "fit-content" }) => (height === "full-height" ? "100%" : height)};
  overflow: hidden;
  padding: ${PADDING[32]}px;

  background-color: #ffffff;

  border-radius: ${({ theme }) => theme.borderRadius}px;

  gap: ${GAP[32]}px;
`;
