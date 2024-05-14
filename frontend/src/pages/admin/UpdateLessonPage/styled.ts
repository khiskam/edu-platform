import styled from "@emotion/styled";

import { GAP, PADDING } from "@/shared/constants";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  overflow: hidden;
  padding: ${PADDING[32]}px;

  background-color: #ffffff;

  border-radius: ${({ theme }) => theme.borderRadius}px;

  gap: ${GAP[32]}px;
`;
