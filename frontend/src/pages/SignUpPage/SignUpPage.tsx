import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";

import { Container, FormContainer, FormField } from "@/components";

import { inputs, schema } from "./fields";
import { FormData } from "./fields";
import { useFormSubmit } from "./hooks";

export const SignUpPage = () => {
  const { control, handleSubmit, trigger, setError } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const { isPending, onSubmit } = useFormSubmit(handleSubmit, setError);

  return (
    <Container>
      <Flex align="center" justify="center">
        <FormContainer>
          <Spin spinning={isPending}>
            <Typography.Title level={2}>Регистрация</Typography.Title>
            <Form layout="vertical" onFinish={onSubmit}>
              {inputs.map(({ key, revalidate, ...value }) => (
                <FormField<FormData>
                  key={key}
                  controller={{ control, name: key }}
                  trigger={
                    revalidate ? { fn: trigger, name: revalidate } : undefined
                  }
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
