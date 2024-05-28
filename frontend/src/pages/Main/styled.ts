import styled from "@emotion/styled";

import { GAP } from "@/shared/theme";

export const Layout = styled.div`
  display: grid;
  margin: 64px 0;

  gap: ${GAP[80]}px;
`;

export const Section = styled.section`
  display: grid;
  overflow: hidden;

  gap: ${GAP[32]}px;
`;
