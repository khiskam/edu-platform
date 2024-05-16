import { Spin } from "antd";

import { SignUpForm as SignUpFormLayout } from "@/features";

import { useFormSubmit } from "./utils";

export const SignUpForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <SignUpFormLayout onSubmit={onSubmit} />
    </Spin>
  );
};
