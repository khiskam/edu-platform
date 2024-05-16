import { Spin } from "antd";

import { SignInForm as SignInFormLayout } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useFormSubmit } from "./utils";

export const SignInForm = ({ onSuccess }: FormWidgetProps) => {
  const { onSubmit, isLoading, isSuccess } = useFormSubmit();
  useSuccessObserver(isSuccess, onSuccess);

  return (
    <Spin spinning={isLoading}>
      <SignInFormLayout onSubmit={onSubmit} />
    </Spin>
  );
};
