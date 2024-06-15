import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
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
