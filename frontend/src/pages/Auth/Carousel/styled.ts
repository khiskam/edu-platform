import { css } from "@emotion/css";
import styled from "@emotion/styled";

import { PADDING } from "@/shared/theme";

import { SlideProps } from "./types";

export const icon = css`
  height: 100%;
`;

export const Slide = styled.div<SlideProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 480px;
  padding: ${({ padding = "left" }) =>
    padding === "left" ? `0 0 0 ${PADDING[32]}px` : `0 ${PADDING[32]}px 0 0`};
`;

export const Layout = styled.div`
  overflow: hidden;
`;
