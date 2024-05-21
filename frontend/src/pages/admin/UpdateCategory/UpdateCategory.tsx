import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { UpdateCategoryForm } from "@/widgets";

export const UpdateCategory = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать категорию</Typography.Title>
        <UpdateCategoryForm />
      </PageLayout>
    </Container>
  );
};
