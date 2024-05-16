import { Typography } from "antd";

import { Container, PageLayout } from "@/components";

export const LessonPage = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Typography.Title level={2}>Задание 1</Typography.Title>
        <Typography.Paragraph>Описание задания: </Typography.Paragraph>
        <Typography.Paragraph>разметка</Typography.Paragraph>
      </PageLayout>
    </Container>
  );
};
