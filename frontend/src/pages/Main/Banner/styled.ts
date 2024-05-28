import { css } from "@emotion/css";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";
import { COLORS } from "@/shared/theme/constants";

export const ContentLayout = styled.div`
  display: grid;
  justify-items: start;

  gap: ${GAP[24]}px;
`;

export const title = (theme: Theme) => css`
  margin: 0 !important;

  font-size: 40px !important;
  font-weight: 700 !important;

  .orange {
    color: ${COLORS.orange};
  }

  @media screen and (max-width: ${theme.screenXL}px) {
    font-size: 32px !important;
  }

  @media screen and (max-width: ${theme.screenMD}px) {
    font-size: 28px !important;
  }
`;

export const subtitle = (theme: Theme) => css`
  font-size: 20px;

  @media screen and (max-width: ${theme.screenMD}px) {
    font-size: 16px;
  }
`;
