import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { TextField } from "@/components";
import { FormProps } from "@/shared/types";
import { SignInData, signInSchema } from "@/shared/validation";

export const SignInForm = ({ onSubmit }: FormProps<SignInData>) => {
  const { handleSubmit, setError, control } = useForm<SignInData>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  const onFinish = handleSubmit(onSubmit(setError));

  return (
    <Form layout="vertical" onFinish={onFinish}>
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
        Войти
      </Button>
    </Form>
  );
};
