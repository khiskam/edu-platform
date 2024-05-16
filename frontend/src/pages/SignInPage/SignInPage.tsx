import { Flex, Typography } from "antd";
import { Navigate } from "react-router-dom";

import { Container, FormContainer } from "@/components";
import { ROUTES } from "@/shared/constants";
import { useSuccessSubmit } from "@/shared/utils";
import { SignInForm } from "@/widgets";

export const SignInPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  if (isSuccess) {
    return <Navigate to={ROUTES.main} />;
  }

  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Typography.Title level={2}>Вход</Typography.Title>

          <SignInForm onSuccess={onSuccess} />
        </FormContainer>
      </Flex>
    </Container>
  );
};
