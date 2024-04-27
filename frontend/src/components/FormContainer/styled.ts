import styled from "@emotion/styled";

export const FormContainer = styled.div`
  padding: ${({ theme }) => theme.paddingXL}px;
  width: 44%;

  border: 1px solid ${({ theme }) => theme.colorBorder};

  border-radius: ${({ theme }) => theme.borderRadius}px;

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    width: 60%;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    width: 80%;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenSM}px) {
    width: 100%;
  }
`;
