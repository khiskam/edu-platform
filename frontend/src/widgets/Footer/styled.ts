import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

import { HEADER_HEIGHT } from "@/shared";

export const footer = (theme: Theme) => css`
  align-items: center;
  display: flex;
  padding: ${theme.paddingMD}px;
  min-height: ${HEADER_HEIGHT}px;
`;
