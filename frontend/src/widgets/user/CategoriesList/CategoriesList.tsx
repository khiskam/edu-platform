import { Spin } from "antd";

import { CategoriesList as CategoriesListLayout } from "@/features";
import { CategoryApi } from "@/shared";

export const CategoriesList = () => {
  const { isLoading, data } = CategoryApi.useGetAllQuery();

  if (isLoading) {
    return <Spin />;
  }

  return <CategoriesListLayout data={data} />;
};
