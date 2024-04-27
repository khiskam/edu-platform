import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

export const icon = (theme: Theme) => css`
  height: 24px;

  & > path {
    stroke-width: 24;
    stroke: ${theme.colorPrimary};
  }
`;

export const text = (theme: Theme) => css`
  word-break: keep-all;

  color: ${theme.colorPrimary};
`;
