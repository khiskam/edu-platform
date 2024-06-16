import Spin from "antd/es/spin";

import { Admin } from "@/layouts";

import { useFormSubmit } from "./hooks";

export const CreateCategory = () => {
  const { isLoading, onSubmit } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <Admin.CategoryForm onSubmit={onSubmit} />
    </Spin>
  );
};
