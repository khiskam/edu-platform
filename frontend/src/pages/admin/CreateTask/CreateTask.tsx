import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
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
