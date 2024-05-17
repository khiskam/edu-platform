import styled from "@emotion/styled";

export const Variant = styled.div`
  padding: ${({ theme }) => `${theme.paddingXS}px ${theme.paddingSM}px`};

  border: 1px solid ${({ theme }) => theme.colorPrimary};
  border-radius: ${({ theme }) => theme.borderRadiusLG}px;
`;
