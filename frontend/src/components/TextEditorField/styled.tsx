import styled from "@emotion/styled";

import { EditorContainerProps } from "./types";

export const EditorContainer = styled.div<EditorContainerProps>`
  display: ${({ hide }) => (hide ? "none" : "block")};
`;
