import { Spin } from "antd";

import { Admin } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useCategoryDataQuery, useFormSubmit } from "./utils";

const { LessonForm } = Admin;

export const CreateLessonForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  const { data: categories, isLoading: isCategoriesLoading } = useCategoryDataQuery();
  useSuccessObserver(isSuccess, onSuccess);

  if (isCategoriesLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isLoading}>
      <LessonForm onSubmit={onSubmit} categories={categories} />
    </Spin>
  );
};
