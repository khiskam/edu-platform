import styled from "@emotion/styled";

import { GAP, PADDING } from "@/shared/theme";

export const Layout = styled.div`
  align-items: center;
  display: grid;
  padding: ${PADDING[32]}px;

  grid-template-columns: repeat(2, 1fr);

  border-radius: ${({ theme }) => theme.borderRadiusLG}px;
  gap: ${GAP[32]}px;

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.div`
  display: grid;
  justify-items: start;

  gap: ${GAP[24]}px;
`;

export const Badge = styled.div`
  padding: 4px 8px;

  color: ${({ theme }) => theme.colorPrimary};

  border: 1px solid ${({ theme }) => theme.colorPrimary};
  border-radius: ${({ theme }) => theme.borderRadius}px;

  span {
    color: ${({ theme }) => theme.colorPrimary};
  }
`;
