import { Spin } from "antd";

import { Admin } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useCategoryDataQuery, useFormSubmit, useLoadDataQuery } from "./utils";

const { LessonForm } = Admin;

export const UpdateLessonForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  const { data, isLoading: isDataLoading } = useLoadDataQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useCategoryDataQuery();

  useSuccessObserver(isSuccess, onSuccess);

  if (isDataLoading || isLoading || isCategoriesLoading) {
    return <Spin />;
  }

  return <LessonForm onSubmit={onSubmit} defaultValues={data} categories={categories} />;
};
