import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { TasksList } from "@/widgets";

export const Tasks = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Задания</Typography.Title>

        <TasksList />
      </PageLayout>
    </Container>
  );
};
