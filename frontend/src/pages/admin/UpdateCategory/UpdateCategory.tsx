import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { UpdateCategoryForm } from "@/widgets";

export const UpdateCategory = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить категорию</Typography.Title>
        <UpdateCategoryForm />
      </PageLayout>
    </Container>
  );
};
