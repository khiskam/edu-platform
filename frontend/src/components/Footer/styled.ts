import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

import { HEADER_HEIGHT } from "@/shared/theme";

export const footer = (theme: Theme) => css`
  align-items: center;
  display: flex;
  padding: ${theme.paddingMD}px;
  min-height: ${HEADER_HEIGHT}px;
`;

export const logo = css`
  display: flex;
`;
