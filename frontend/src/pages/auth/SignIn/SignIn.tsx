import { Flex, Typography } from "antd";

import { Container } from "@/shared/ui";
import { SignInForm } from "@/widgets";

import { FormContainer } from "../styled";

export const SignIn = () => {
  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Typography.Title level={2}>Вход</Typography.Title>

          <SignInForm />
        </FormContainer>
      </Flex>
    </Container>
  );
};
