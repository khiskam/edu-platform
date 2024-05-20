import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { LessonsList } from "@/widgets";

export const Lessons = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Занятия</Typography.Title>

        <LessonsList />
      </PageLayout>
    </Container>
  );
};
