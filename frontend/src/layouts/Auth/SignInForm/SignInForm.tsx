import { yupResolver } from "@hookform/resolvers/yup";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";

import { Fields } from "@/components";
import { FormProps } from "@/layouts/types";
import { useMessageStore } from "@/shared/store";
import { SignInData } from "@/shared/types";
import { signInSchema } from "@/shared/validation";

export const SignInForm = ({ onSubmit }: FormProps<SignInData>) => {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<SignInData>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  useLayoutEffect(() => {
    if (errors.root?.message) {
      useMessageStore.setState({ content: { message: errors.root.message, type: "error" } });
    }
  }, [errors, errors.root]);

  const onFinish = handleSubmit(onSubmit(setError));

  return (
    <>
      <Form layout="vertical" onFinish={onFinish}>
        <Fields.Text
          control={{ control, name: "email" }}
          label="Email"
          placeholder="Email"
          type="input"
        />

        <Fields.Text
          control={{ control, name: "password" }}
          label="Пароль"
          placeholder="Пароль"
          type="password"
        />

        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form>
    </>
  );
};
