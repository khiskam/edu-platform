import Typography from "antd/es/typography";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

export const UpdateCategory = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать категорию</Typography.Title>
        <Admin.UpdateCategory id={categoryId} />
      </PageLayout>
    </Container>
  );
};
