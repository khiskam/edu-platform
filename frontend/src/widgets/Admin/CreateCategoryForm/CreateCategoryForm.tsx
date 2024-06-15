import Spin from "antd/es/spin";

import { Admin } from "@/features";

import { useFormSubmit } from "./hooks";

const { CategoryForm } = Admin;

export const CreateCategoryForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <CategoryForm onSubmit={onSubmit} />
    </Spin>
  );
};
