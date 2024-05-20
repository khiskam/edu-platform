import { Spin } from "antd";

import { CategoriesTable as CategoriesTableLayout } from "@/features";
import { CategoryApi } from "@/shared/api";

export const CategoriesTable = () => {
  const { isLoading, data } = CategoryApi.useGetAllQuery(1, 10);

  if (isLoading) {
    return <Spin />;
  }

  return <CategoriesTableLayout data={data?.categories} />;
};
