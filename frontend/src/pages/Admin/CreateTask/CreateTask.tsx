import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { Admin } from "@/widgets";

const { CreateTaskForm } = Admin;

export const CreateTask = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить задание</Typography.Title>
        <CreateTaskForm />
      </PageLayout>
    </Container>
  );
};
