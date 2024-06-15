import styled from "@emotion/styled";
import Layout from "antd/es/layout";

import { GAP, PADDING } from "@/shared/theme";
import { COLORS } from "@/shared/theme/constants";

import { ContentContainerProps } from "./types";

export const LayoutContainer = styled(Layout)`
  display: flex;
  min-height: 100vh;

  flex-direction: column;
`;

export const OutletContainer = styled.div`
  display: grid;
  flex-grow: 1;
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  align-content: start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${PADDING[56]}px 0;

  background-color: ${({ isBackground }) => (isBackground ? COLORS.bg : "transparent")};

  gap: ${GAP[32]}px;
`;
