import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { FormProps } from "@/features/types";
import { SignUpData } from "@/shared/types";
import { Fields } from "@/shared/ui";
import { signUpSchema } from "@/shared/validation";

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
        onChange={onPasswordChange}
      />

      <Fields.Text
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
