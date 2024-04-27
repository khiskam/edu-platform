import styled from "@emotion/styled";
import { Layout } from "antd";

import { PADDING } from "@/shared/constants";

export const LayoutContainer = styled(Layout)`
  display: flex;
  min-height: 100vh;

  flex-direction: column;
`;

export const OutletContainer = styled.div`
  display: grid;
  padding: ${PADDING[56]}px 0;

  flex-grow: 1;
`;
