import { Spin } from "antd";

import { Admin } from "@/features";
import { FormWidgetProps } from "@/shared/types";
import { useSuccessObserver } from "@/shared/utils";

import { useCategoryDataQuery, useFormSubmit } from "./utils";

const { TaskForm } = Admin;

export const CreateTaskForm = ({ onSuccess }: FormWidgetProps) => {
  const { isLoading, onSubmit, isSuccess } = useFormSubmit();
  const { data: categories, isLoading: isCategoriesLoading } = useCategoryDataQuery();
  useSuccessObserver(isSuccess, onSuccess);

  if (isCategoriesLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isLoading}>
      <TaskForm
        onSubmit={onSubmit}
        defaultValues={{
          answers: [
            { isCorrect: false, value: "" },
            { isCorrect: false, value: "" },
          ],
        }}
        categories={categories}
      />
    </Spin>
  );
};
