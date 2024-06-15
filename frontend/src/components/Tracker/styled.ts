import styled from "@emotion/styled";

import { TrackerItemProps } from "./types";
import { colorByType } from "./utils";

export const TrackerLayout = styled.div`
  display: grid;

  gap: 4px;
  grid-template-columns: repeat(7, 28px);

  @media screen and (max-width: ${({ theme }) => theme.screenXS}px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const TrackerItem = styled.div<TrackerItemProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;

  background-color: ${({ type, theme }) => colorByType(type, theme)};

  border-radius: 4px;

  aspect-ratio: 1;
`;
