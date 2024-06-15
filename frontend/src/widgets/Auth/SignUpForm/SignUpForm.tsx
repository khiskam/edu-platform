import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { SignUpForm as SignUpFormLayout } from "@/features";
import { ROUTES } from "@/shared/routes";

import { useFormSubmit } from "./hooks";

export const SignUpForm = () => {
  const { onSubmit, isLoading, isSuccess } = useFormSubmit();

  if (isSuccess) {
    return <Navigate to={ROUTES.main.path} />;
  }

  return (
    <Spin spinning={isLoading}>
      <SignUpFormLayout onSubmit={onSubmit} />
    </Spin>
  );
};
