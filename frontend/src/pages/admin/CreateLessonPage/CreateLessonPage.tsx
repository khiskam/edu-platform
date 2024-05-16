import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { useSuccessSubmit } from "@/shared/utils";
import { CreateLessonForm } from "@/widgets";

export const CreateLessonPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  console.log(isSuccess);

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить занятие</Typography.Title>

        <CreateLessonForm onSuccess={onSuccess} />
      </PageLayout>
    </Container>
  );
};
