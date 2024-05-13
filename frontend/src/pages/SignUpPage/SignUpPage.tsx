import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Container, FormContainer } from "@/components";
import { ROUTES } from "@/shared/constants";

import { useFormSubmit } from "./hooks";
import { FormData, schema } from "./schema";

export const SignUpPage = () => {
  const { control, handleSubmit, trigger, setError, getValues } =
    useForm<FormData>({
      mode: "onChange",
      criteriaMode: "all",
      resolver: yupResolver(schema),
    });

  const { isLoading, onSubmit, isSuccess } = useFormSubmit(
    handleSubmit,
    setError
  );

  if (isSuccess) {
    return <Navigate to={ROUTES.main} />;
  }

  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Spin spinning={isLoading}>
            <Typography.Title level={2}>Регистрация</Typography.Title>
            <Form layout="vertical" onFinish={onSubmit}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <Form.Item
                    label="Email"
                    validateStatus={error ? "error" : "validating"}
                    help={error?.message}
                  >
                    <Input placeholder="Email" {...field} />
                  </Form.Item>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, ...field },
                  fieldState: { error },
                }) => (
                  <Form.Item
                    label="Пароль"
                    validateStatus={error ? "error" : "validating"}
                    help={error?.message}
                  >
                    <Input.Password
                      placeholder="Пароль"
                      autoComplete="on"
                      onChange={(e) => {
                        if (getValues("confirmPassword") != undefined) {
                          trigger("confirmPassword");
                        }
                        onChange(e);
                      }}
                      {...field}
                    />
                  </Form.Item>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState: { error } }) => (
                  <Form.Item
                    label="Повторить пароль"
                    validateStatus={error ? "error" : "validating"}
                    help={error?.message}
                  >
                    <Input.Password
                      placeholder="Повторить пароль"
                      autoComplete="on"
                      {...field}
                    />
                  </Form.Item>
                )}
              />

              <Button type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
            </Form>
          </Spin>
        </FormContainer>
      </Flex>
    </Container>
  );
};
