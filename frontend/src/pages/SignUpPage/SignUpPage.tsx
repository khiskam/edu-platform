import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";

import { Container, FormContainer, FormField } from "@/components";

import { FormData, inputs, schema } from "./fields";
import { useFormSubmit, useHandler } from "./hooks";

export const SignUpPage = () => {
  const { control, handleSubmit, trigger, setError, getValues } =
    useForm<FormData>({
      mode: "onChange",
      criteriaMode: "all",
      resolver: yupResolver(schema),
    });

  const handlers = useHandler(getValues, trigger);

  const { isPending, onSubmit } = useFormSubmit(handleSubmit, setError);

  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Spin spinning={isPending}>
            <Typography.Title level={2}>Регистрация</Typography.Title>
            <Form layout="vertical" onFinish={onSubmit}>
              {inputs.map(({ key, ...value }) => (
                <FormField<FormData>
                  key={key}
                  controller={{ control, name: key }}
                  onChange={handlers[key]}
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
