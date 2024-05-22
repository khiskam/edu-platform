import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const Layout = styled.div`
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
