import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Spin } from "antd";
import { useForm } from "react-hook-form";

import { TextField } from "@/components";
import { FormProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { FormData, schema } from "./schema";
import { useFormSubmit } from "./utils";

export const SignInForm = ({ onSuccess, button }: FormProps) => {
  const { handleSubmit, setError, control } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { onSubmit, isLoading, isSuccess } = useFormSubmit();
  useSuccessObserver(isSuccess, onSuccess);

  const onFinish = handleSubmit(onSubmit(setError));

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
        />

        <Button type="primary" htmlType="submit">
          {button}
        </Button>
      </Form>
    </Spin>
  );
};
