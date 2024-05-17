import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { Task as TaskWidget } from "@/widgets";

export const Task = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Категория</Typography.Title>

        <TaskWidget />
      </PageLayout>
    </Container>
  );
};
