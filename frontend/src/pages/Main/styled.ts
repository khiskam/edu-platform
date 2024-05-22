import { css } from "@emotion/css";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Layout = styled.div`
  display: grid;
  margin: 64px 0;

  gap: 64px;
`;

export const title = (theme: Theme) => css`
  color: ${theme.colorPrimary} !important;
`;
