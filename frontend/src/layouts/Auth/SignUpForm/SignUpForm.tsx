import { yupResolver } from "@hookform/resolvers/yup";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { useForm } from "react-hook-form";

import { Fields } from "@/components";
import { FormProps } from "@/layouts/types";
import { SignUpData } from "@/shared/types";
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
        control={{ control, name: "firstName" }}
        label="Имя"
        placeholder="Имя"
        type="input"
      />

      <Fields.Text
        control={{ control, name: "lastName" }}
        label="Фамилия"
        placeholder="Фамилия"
        type="input"
      />

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
