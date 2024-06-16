import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { Admin } from "@/layouts";
import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

export const Category = ({ id }: Id) => {
  const { isLoading, isError, data } = CategoryApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <Admin.Category data={data.category} />;
};
