import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Input, message, Spin, Typography } from "antd";
import { useCallback, useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Container, FormContainer } from "@/components";

import { useFormSubmit } from "./hooks";
import { FormData, schema } from "./schema";

export const SignInPage = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });
  const { onSubmit, isLoading, isError } = useFormSubmit(
    handleSubmit,
    setError
  );

  const [messageApi, contextHolder] = message.useMessage();

  const error = useCallback(
    (message?: string) => {
      if (message) {
        messageApi.open({
          type: "error",
          content: message,
        });
      }
    },
    [messageApi]
  );

  useLayoutEffect(() => {
    // console.log(isError && errors.root);
    if (isError && errors.root?.message) {
      error(errors.root?.message);
    }
  }, [isError, errors, error]);

  return (
    <>
      {contextHolder}
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
                  render={({ field, fieldState: { error } }) => (
                    <Form.Item
                      label="Пароль"
                      validateStatus={error ? "error" : "validating"}
                      help={error?.message}
                    >
                      <Input.Password
                        placeholder="Пароль"
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
    </>
  );
};
