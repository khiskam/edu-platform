import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const Layout = styled.div`
  align-items: center;
  display: grid;

  border-radius: ${({ theme }) => theme.borderRadiusLG}px;
  gap: ${GAP[32]}px;
`;
