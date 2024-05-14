import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Container, FormContainer, TextField } from "@/components";
import { ROUTES } from "@/shared/constants";

import { useFormSubmit } from "./hooks";
import { FormData, schema } from "./schema";

export const SignInPage = () => {
  const { handleSubmit, control, setError } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const { onSubmit, isLoading, isSuccess } = useFormSubmit(handleSubmit, setError);

  if (isSuccess) {
    return <Navigate to={ROUTES.main} />;
  }

  return (
    <>
      <Container>
        <Flex align="center" justify="center">
          <FormContainer>
            <Spin spinning={isLoading}>
              <Typography.Title level={2}>Регистрация</Typography.Title>

              <Form layout="vertical" onFinish={onSubmit}>
                <TextField
                  control={{ control, name: "email" }}
                  label="Email"
                  placeholder="Email"
                  type="input"
                />

                <TextField
                  control={{ control, name: "password" }}
                  label="Пароль"
                  placeholder="Пароль"
                  type="password"
                />

                <Button type="primary" htmlType="submit">
                  Зарегистрироваться
                </Button>
              </Form>
            </Spin>
          </FormContainer>
        </Flex>
      </Container>
    </>
  );
};
