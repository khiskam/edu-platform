import styled from "@emotion/styled";

import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  width: ${({ fullWidth = false }) => (fullWidth ? "100%" : "40%")};

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    width: ${({ fullWidth = false }) => (fullWidth ? "100%" : "60%")};
  }

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    width: 100%;
  }
`;
