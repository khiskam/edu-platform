import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  margin: -32px auto 0;
  padding: 32px;
  width: 80%;

  background: ${({ theme }) => theme.colorWhite};
  box-shadow: rgba(10, 108, 231, 0.12) 0px 8px 24px;

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
