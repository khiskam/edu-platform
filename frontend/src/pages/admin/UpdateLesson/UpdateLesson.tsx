import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { UpdateLessonForm } from "@/widgets";

export const UpdateLesson = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать занятие</Typography.Title>

        <UpdateLessonForm />
      </PageLayout>
    </Container>
  );
};
