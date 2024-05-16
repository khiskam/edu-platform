import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { UpdateTaskForm } from "@/widgets";

export const UpdateTask = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить задание</Typography.Title>
        <UpdateTaskForm />
      </PageLayout>
    </Container>
  );
};
