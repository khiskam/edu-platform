import { Spin } from "antd";

import { SignUpForm as SignUpFormLayout } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useFormSubmit } from "./utils";

export const SignUpForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  useSuccessObserver(isSuccess, onSuccess);

  return (
    <Spin spinning={isLoading}>
      <SignUpFormLayout onSubmit={onSubmit} />
    </Spin>
  );
};
