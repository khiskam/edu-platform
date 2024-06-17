import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

export const text = (theme: Theme) => css`
  width: 100%;
  overflow-y: auto;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colorText};
  }
`;
