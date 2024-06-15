import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { COLORS, GAP } from "@/shared/theme/constants";

export const avatar = css`
  background-color: ${COLORS.orange};

  font-size: 48px !important;
  text-transform: uppercase;
`;

export const Layout = styled.div`
  display: grid;

  gap: ${GAP[32]}px;
  grid-template-columns: auto 1fr;

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    grid-template-columns: 1fr;
  }
`;

export const DescriptionLayout = styled.div`
  display: grid;

  gap: ${GAP[32]}px ${GAP[64]}px;
  grid-template-columns: auto 1fr;

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.screenSM}px) {
    grid-template-columns: 1fr;
  }
`;
