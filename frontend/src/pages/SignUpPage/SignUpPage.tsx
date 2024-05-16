import { Flex, Typography } from "antd";
import { Navigate } from "react-router-dom";

import { Container, FormContainer } from "@/components";
import { ROUTES } from "@/shared/constants";
import { useSuccessSubmit } from "@/shared/utils";
import { SignUpForm } from "@/widgets";

export const SignUpPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  if (isSuccess) {
    return <Navigate to={ROUTES.main} />;
  }

  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Typography.Title level={2}>Регистрация</Typography.Title>

          <SignUpForm onSuccess={onSuccess} />
        </FormContainer>
      </Flex>
    </Container>
  );
};
