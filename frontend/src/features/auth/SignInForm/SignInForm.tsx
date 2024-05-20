import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { FormProps } from "@/features/types";
import { SignInData } from "@/shared/types";
import { Fields } from "@/shared/ui";
import { signInSchema } from "@/shared/validation";

import { useMessage } from "./hooks";

export const SignInForm = ({ onSubmit }: FormProps<SignInData>) => {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<SignInData>({
    mode: "onChange",
    resolver: yupResolver(signInSchema),
  });

  const contextHolder = useMessage(errors, clearErrors);

  const onFinish = handleSubmit(onSubmit(setError));

  return (
    <>
      {contextHolder}
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
