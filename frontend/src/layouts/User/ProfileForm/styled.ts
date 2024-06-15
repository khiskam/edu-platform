import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const FormLayout = styled.div`
  display: grid;

  gap: ${GAP[12]}px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    grid-template-columns: 1fr;
  }
`;
