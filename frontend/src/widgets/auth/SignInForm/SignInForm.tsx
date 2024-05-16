import { Spin } from "antd";

import { SignInForm as SignInFormLayout } from "@/features";

import { useFormSubmit } from "./utils";

export const SignInForm = () => {
  const { onSubmit, isLoading } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <SignInFormLayout onSubmit={onSubmit} />
    </Spin>
  );
};
