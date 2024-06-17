import { Navigate, useParams } from "react-router-dom";

import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { Skeleton } from "./Skeleton";

export const Category = () => {
  const { categoryId } = useParams();

  console.log(categoryId);

  if (!categoryId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <CategoryCrumb id={categoryId} />;
};

export const CategoryCrumb = ({ id }: Id) => {
  const { isLoading, data, isError } = CategoryApi.useGetOneQuery(id);

  if (isLoading) {
    return <Skeleton />;
  } else if (isError) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  } else {
    return <>{data?.category.name}</>;
  }
};
