import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
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
