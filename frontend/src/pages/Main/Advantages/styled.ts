import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

export const icon = (theme: Theme) => css`
  height: 100px;

  @media screen and (max-width: ${theme.screenLG}px) {
    height: 148px;
  }
`;
