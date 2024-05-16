import styled from "@emotion/styled";
import { Layout } from "antd";

import { GAP, PADDING } from "@/shared";

export const LayoutContainer = styled(Layout)`
  display: flex;
  min-height: 100vh;

  flex-direction: column;
`;

export const OutletContainer = styled.div`
  display: grid;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  align-content: start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${PADDING[56]}px 0;

  gap: ${GAP[32]}px;
`;
