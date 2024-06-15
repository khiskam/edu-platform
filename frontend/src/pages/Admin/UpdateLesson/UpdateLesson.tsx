import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { Admin } from "@/widgets";

const { UpdateLessonForm } = Admin;

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
