import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { Admin } from "@/widgets";

const { UpdateTaskForm } = Admin;

export const UpdateTask = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать задание</Typography.Title>
        <UpdateTaskForm />
      </PageLayout>
    </Container>
  );
};
