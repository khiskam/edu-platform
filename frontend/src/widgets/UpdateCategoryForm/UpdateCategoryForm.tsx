import { Spin } from "antd";

import { Admin } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useFormSubmit, useLoadDataQuery } from "./utils";

const { CategoryForm } = Admin;

export const UpdateCategoryForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  const { data, isLoading: isDataLoading } = useLoadDataQuery();

  useSuccessObserver(isSuccess, onSuccess);

  if (isDataLoading || isLoading) {
    return <Spin />;
  }

  return <CategoryForm onSubmit={onSubmit} defaultValues={data} />;
};
