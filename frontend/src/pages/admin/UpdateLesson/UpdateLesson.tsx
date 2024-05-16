import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { UpdateLessonForm } from "@/widgets";

export const UpdateLesson = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить занятие</Typography.Title>

        <UpdateLessonForm />
      </PageLayout>
    </Container>
  );
};
