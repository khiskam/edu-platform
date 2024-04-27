import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

export const header = (theme: Theme) => css`
  border-bottom: 1px solid ${theme.colorBorder};
`;

export const inner = css`
  align-items: center;
  display: grid;

  grid-template-columns: auto 1fr;
`;

export const menu = css`
  justify-content: end;
  min-width: 0;

  border-bottom: none;
`;
