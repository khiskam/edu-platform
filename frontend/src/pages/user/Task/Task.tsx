import { Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { User } from "@/widgets";

const { Task: TaskWidget } = User;

export const Task = () => {
  const { taskId } = useParams();

  if (!taskId) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Задание</Typography.Title>

        <TaskWidget id={taskId} />
      </PageLayout>
    </Container>
  );
};
