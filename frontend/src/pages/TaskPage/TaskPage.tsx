import { Form, Typography } from "antd";

import { Container, PageLayout } from "@/components";

export const TaskPage = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Typography.Title level={2}>Задание 1</Typography.Title>

        <Typography.Text>Описание задания</Typography.Text>

        <Form></Form>
      </PageLayout>
    </Container>
  );
};
