import styled from "@emotion/styled";

import { GAP } from "@/shared/theme/constants";

export const Layout = styled.div`
  display: grid;

  gap: ${GAP[32]}px;
  grid-template-columns: auto 1fr;

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    grid-template-columns: 1fr;
  }
`;

export const DescriptionLayout = styled.div`
  display: grid;

  gap: ${GAP[24]}px ${GAP[64]}px;
  grid-template-columns: auto 1fr;

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    grid-template-columns: 1fr;
  }
`;
