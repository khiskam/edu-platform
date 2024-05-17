import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { Lesson as LessonWidget } from "@/widgets";

export const Lesson = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Категория</Typography.Title>

        <LessonWidget />
      </PageLayout>
    </Container>
  );
};
