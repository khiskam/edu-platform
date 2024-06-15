import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

export const search = (theme: Theme) => css`
  width: 44%;

  @media screen and (max-width: ${theme.screenLG}px) {
    width: 68%;
  }

  @media screen and (max-width: ${theme.screenMD}px) {
    width: 100%;
  }
`;
