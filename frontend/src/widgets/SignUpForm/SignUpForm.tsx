import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Spin } from "antd";
import { useForm } from "react-hook-form";

import { TextField } from "@/components";
import { FormProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { FormData, schema } from "./schema";
import { useFormSubmit } from "./utils";

export const SignUpForm = ({ onSuccess, button }: FormProps) => {
  const { control, handleSubmit, trigger, setError, getValues } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  useSuccessObserver(isSuccess, onSuccess);

  const onFinish = handleSubmit(onSubmit(setError));

  const onPasswordChange = () => {
    if (getValues("confirmPassword") !== undefined) {
      trigger("confirmPassword");
    }
  };

  return (
    <Spin spinning={isLoading}>
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
          {button}
        </Button>
      </Form>
    </Spin>
  );
};
