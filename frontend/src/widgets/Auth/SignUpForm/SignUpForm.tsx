import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { Auth } from "@/layouts";
import { ROUTES } from "@/shared/routes";

import { useFormSubmit } from "./hooks";

export const SignUpForm = () => {
  const { onSubmit, isPending, isSuccess } = useFormSubmit();

  if (isSuccess) {
    return <Navigate to={ROUTES.main.path} />;
  }

  return (
    <Spin spinning={isPending}>
      <Auth.SignUpForm onSubmit={onSubmit} />
    </Spin>
  );
};
