import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { Admin } from "@/widgets";

const { UpdateCategoryForm } = Admin;

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
