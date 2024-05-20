import { Spin } from "antd";

import { CategoryForm } from "@/features";
import { CategoryApi } from "@/shared/api";

import { useFormSubmit } from "./utils";

export const UpdateCategoryForm = () => {
  const { isLoading, onSubmit } = useFormSubmit("1");
  const { data, isLoading: isDataLoading } = CategoryApi.useGetOneQuery("1");

  if (isDataLoading || isLoading) {
    return <Spin />;
  }

  return <CategoryForm onSubmit={onSubmit} defaultValues={data?.category} />;
};
