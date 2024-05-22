import { Spin } from "antd";
import { Navigate } from "react-router-dom";

import { User } from "@/features";
import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

const { Category: CategoryLayout } = User;

export const Category = ({ id }: Id) => {
  const { isLoading, isError, data } = CategoryApi.useGetOneWithProgressQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <CategoryLayout data={data.category} />;
};
