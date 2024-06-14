import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { SignInForm as SignInFormLayout } from "@/features";
import { ROUTES } from "@/shared/routes";

import { useFormSubmit } from "./hooks";

export const SignInForm = () => {
  const { onSubmit, isLoading, isSuccess } = useFormSubmit();

  if (isSuccess) {
    return <Navigate to={ROUTES.main.path} />;
  }

  return (
    <Spin spinning={isLoading}>
      <SignInFormLayout onSubmit={onSubmit} />
    </Spin>
  );
};
