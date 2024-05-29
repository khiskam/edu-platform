import { Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

const { Category: CategoryWidget } = Admin;

export const Category = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={ROUTES.categories.path} />;
  }
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Категория</Typography.Title>

        <CategoryWidget id={categoryId} />
      </PageLayout>
    </Container>
  );
};
