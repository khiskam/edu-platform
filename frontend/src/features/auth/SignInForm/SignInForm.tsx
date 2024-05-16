import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { FormProps } from "@/features/types";
import { signInSchema } from "@/shared";
import { Fields } from "@/shared";
import { SignInData } from "@/shared/types";

export const SignInForm = ({ onSubmit }: FormProps<SignInData>) => {
  const { handleSubmit, setError, control } = useForm<SignInData>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  const onFinish = handleSubmit(onSubmit(setError));

  return (
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
  );
};
