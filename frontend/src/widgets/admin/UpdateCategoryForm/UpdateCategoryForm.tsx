import { Spin } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { CategoryForm } from "@/features";
import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { useFormSubmit } from "./hooks";

export const UpdateCategoryForm = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <UpdateCategoryFormById id={categoryId} />;
};

export const UpdateCategoryFormById = ({ id }: Id) => {
  const { isLoading, onSubmit } = useFormSubmit(id);
  const { data, isLoading: isDataLoading, isRefetching } = CategoryApi.useGetOneQuery(id);

  if (isDataLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isRefetching || isLoading}>
      <CategoryForm onSubmit={onSubmit} defaultValues={data?.category} />
    </Spin>
  );
};
