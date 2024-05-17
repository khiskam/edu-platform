import { Spin } from "antd";

import { CategoriesTable as CategoriesTableLayout } from "@/features";
import { CategoryApi } from "@/shared";

export const CategoriesTable = () => {
  const { isLoading, data } = CategoryApi.useGetAllQuery();

  if (isLoading) {
    return <Spin />;
  }

  return <CategoriesTableLayout data={data} />;
};
