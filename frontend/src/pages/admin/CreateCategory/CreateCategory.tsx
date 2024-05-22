import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { Admin } from "@/widgets";

const { CreateCategoryForm } = Admin;

export const CreateCategory = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить категорию</Typography.Title>
        <CreateCategoryForm />
      </PageLayout>
    </Container>
  );
};
