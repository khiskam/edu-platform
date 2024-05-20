import { Spin } from "antd";

import { CategoryForm } from "@/features";

import { useFormSubmit } from "./hooks";

export const CreateCategoryForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <CategoryForm onSubmit={onSubmit} />
    </Spin>
  );
};
