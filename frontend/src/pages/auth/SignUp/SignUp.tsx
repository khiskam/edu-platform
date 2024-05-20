import { Flex, Typography } from "antd";

import { Container } from "@/shared/ui";
import { SignUpForm } from "@/widgets";

import { FormContainer } from "../styled";

export const SignUp = () => {
  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Typography.Title level={2}>Регистрация</Typography.Title>

          <SignUpForm />
        </FormContainer>
      </Flex>
    </Container>
  );
};
