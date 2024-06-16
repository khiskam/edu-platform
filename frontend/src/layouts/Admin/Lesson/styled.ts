import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

export const text = (theme: Theme) => css`
  > p {
    color: ${theme.colorText};
    margin: 0;
  }
`;
