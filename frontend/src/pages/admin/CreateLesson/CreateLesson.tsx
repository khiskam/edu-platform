import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { Admin } from "@/widgets";

const { CreateLessonForm } = Admin;

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
