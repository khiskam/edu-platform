import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";
import { COLORS } from "@/shared/theme/constants";

export const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  margin: -32px auto 0;
  padding: 32px;
  width: 80%;

  background: ${COLORS.bg};
  box-shadow: 0 8px 12px -4px rgba(0, 108, 231, 0.12);

  border-radius: 8px;

  gap: ${GAP[24]}px;

  @media screen and (max-width: ${({ theme }) => theme.screenXL}px) {
    width: 100%;
    margin: 32px auto 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenSM}px) {
    display: grid;

    box-shadow: none;
  }
`;

export const statistic = css`
  font-weight: 600;
`;
