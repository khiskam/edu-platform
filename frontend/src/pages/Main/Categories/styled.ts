import { css } from "@emotion/css";

import { PADDING } from "@/shared/theme";

export const tag = css`
  margin: 0;
  padding: ${PADDING[8]}px ${PADDING[12]}px;

  font-size: 16px;
`;

export const skeletonTitle = css`
  height: 24px !important;
  margin: 0;
`;

export const skeleton = css`
  width: auto;
`;
