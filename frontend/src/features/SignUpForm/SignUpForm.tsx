import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { TextField } from "@/components";
import { FormProps } from "@/shared/types";
import { SignUpData, signUpSchema } from "@/shared/validation";

export const SignUpForm = ({ onSubmit }: FormProps<SignUpData>) => {
  const { control, handleSubmit, trigger, setError, getValues } = useForm<SignUpData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(signUpSchema),
  });

  const onPasswordChange = () => {
    if (getValues("confirmPassword") !== undefined) {
      trigger("confirmPassword");
    }
  };

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
        onChange={onPasswordChange}
      />

      <TextField
        control={{ control, name: "confirmPassword" }}
        label="Подтвердить пароль"
        placeholder="Подтвердить пароль"
        type="password"
      />

      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};
