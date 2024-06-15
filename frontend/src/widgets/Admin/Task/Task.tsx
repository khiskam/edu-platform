import Spin from "antd/es/spin";
import Typography from "antd/es/typography";
import { Navigate } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { Admin } from "@/features";
import { getTask, TaskApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";
const { Task: TaskLayout } = Admin;

export const Task = ({ id }: Id) => {
  const { isLoading, isError, data } = TaskApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  const task = getTask(data);

  if (isLoading || !data || !task) {
    return <Spin />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Занятие</Typography.Title>
        <TaskLayout data={task} />
      </PageLayout>
    </Container>
  );
};
