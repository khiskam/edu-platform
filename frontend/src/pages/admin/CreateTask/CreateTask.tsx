import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { CreateTaskForm } from "@/widgets";

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
