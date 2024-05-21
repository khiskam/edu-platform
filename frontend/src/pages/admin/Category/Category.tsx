import { Button, Spin, Typography } from "antd";
import { Navigate, NavLink, useParams } from "react-router-dom";

import { CategoryApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";
import { Container, PageLayout } from "@/shared/ui";

export const Category = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={ROUTES.categories.path} />;
  }
  return <CategoryById id={categoryId} />;
};

export const CategoryById = ({ id }: Id) => {
  const { isLoading, isError, data } = CategoryApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Категория "{data.category.name}"</Typography.Title>

        <NavLink to={`${ROUTES.lessons.name}`}>
          <Button>Перейти к занятиям</Button>
        </NavLink>
      </PageLayout>
    </Container>
  );
};
