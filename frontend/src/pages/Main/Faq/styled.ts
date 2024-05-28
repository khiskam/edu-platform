import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const AccordionsContainer = styled.div`
  display: grid;

  gap: ${GAP[8]}px;
`;

export const accordionIcon = css`
  font-size: 16px !important;
`;
