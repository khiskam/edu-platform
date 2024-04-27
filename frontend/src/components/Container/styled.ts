import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  margin: 0 auto;
  max-width: 1320px;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.screenXXL}px) {
    max-width: 1140px;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenXL}px) {
    max-width: 960px;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenLG}px) {
    max-width: 720px;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenMD}px) {
    padding: 0 40px;
  }

  @media screen and (max-width: ${({ theme }) => theme.screenSM}px) {
    padding: 0 20px;
  }
`;
