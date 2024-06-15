import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { Admin } from "@/features";
import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

const { Category: CategoryLayout } = Admin;

export const Category = ({ id }: Id) => {
  const { isLoading, isError, data } = CategoryApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <CategoryLayout data={data.category} />;
};
