import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";

import { Container, FormContainer, FormField } from "@/components";

import { FormData, inputs, schema } from "./fields";
import { useFormSubmit } from "./hooks";

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

  const { onSubmit, isPending } = useFormSubmit(handleSubmit, setError);

  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Spin spinning={isPending}>
            <Typography.Title level={2}>Регистрация</Typography.Title>

            {errors.root?.message && (
              <Typography.Text type="danger">
                {errors.root.message}
              </Typography.Text>
            )}
            <Form layout="vertical" onFinish={onSubmit}>
              {inputs.map(({ key, ...value }) => (
                <FormField<FormData>
                  key={key}
                  controller={{ control, name: key }}
                  {...value}
                />
              ))}

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
