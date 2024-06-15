import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
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
