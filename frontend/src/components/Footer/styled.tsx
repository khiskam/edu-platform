import { css } from "@emotion/css";
import { Theme } from "@emotion/react";

import { HEADER_HEIGHT } from "@/shared/constants";

export const footer = (theme: Theme) => css`
  align-items: center;
  display: flex;
  padding: ${theme.paddingMD}px;
  min-height: ${HEADER_HEIGHT}px;

  border-top: 1px solid ${theme.colorBorder};
`;
