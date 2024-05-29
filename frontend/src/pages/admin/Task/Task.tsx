import { Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

const { Task: TaskWidget } = Admin;

export const Task = () => {
  const { taskId } = useParams();

  if (!taskId) {
    return <Navigate to={ROUTES.categories.path} />;
  }
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Занятие</Typography.Title>

        <TaskWidget id={taskId} />
      </PageLayout>
    </Container>
  );
};
