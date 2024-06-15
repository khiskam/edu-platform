import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const Layout = styled.div`
  display: grid;

  gap: ${GAP[80]}px;

  @media screen and (max-width: ${({ theme }) => theme.screenXL}px) {
    width: 100%;
    margin: 32px auto 0;
  }
`;

export const Section = styled.section`
  display: grid;
  overflow: hidden;

  gap: ${GAP[32]}px;
`;
