import { Spin } from "antd";

import { Admin } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useCategoryDataQuery, useFormSubmit, useLoadDataQuery } from "./utils";

const { TaskForm } = Admin;

export const UpdateTaskForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  const { data, isLoading: isDataLoading } = useLoadDataQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useCategoryDataQuery();
  useSuccessObserver(isSuccess, onSuccess);

  if (isLoading || isDataLoading || isCategoriesLoading) {
    return <Spin />;
  }

  return <TaskForm onSubmit={onSubmit} defaultValues={data} categories={categories} />;
};
