import { Spin } from "antd";
import { Navigate } from "react-router-dom";

import { User } from "@/layouts";
import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

export const Category = ({ id }: Id) => {
  const { isLoading, isError, data } = CategoryApi.useGetOneProgressQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <User.Category data={data.category} />;
};
