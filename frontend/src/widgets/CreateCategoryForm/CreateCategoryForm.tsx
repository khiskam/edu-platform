import { Spin } from "antd";

import { Admin } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useFormSubmit } from "./utils";

const { CategoryForm } = Admin;

export const CreateCategoryForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  useSuccessObserver(isSuccess, onSuccess);

  return (
    <Spin spinning={isLoading}>
      <CategoryForm onSubmit={onSubmit} />
    </Spin>
  );
};
