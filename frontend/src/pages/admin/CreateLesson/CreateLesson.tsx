import { Typography } from "antd";

import { Container, PageLayout } from "@/shared";
import { CreateLessonForm } from "@/widgets";

export const CreateLesson = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить занятие</Typography.Title>

        <CreateLessonForm />
      </PageLayout>
    </Container>
  );
};
