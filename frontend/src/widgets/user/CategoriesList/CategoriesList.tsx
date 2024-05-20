import { Spin } from "antd";

import { CategoriesList as CategoriesListLayout } from "@/features";
import { CategoryApi } from "@/shared/api";

export const CategoriesList = () => {
  const { isLoading, data } = CategoryApi.useGetAllQuery(1, 10);

  if (isLoading) {
    return <Spin />;
  }

  return <CategoriesListLayout data={data?.categories} />;
};
