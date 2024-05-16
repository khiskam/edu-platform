import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { useSuccessSubmit } from "@/shared/utils";
import { UpdateLessonForm } from "@/widgets";

export const UpdateLessonPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  console.log(isSuccess);

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать занятие</Typography.Title>

        <UpdateLessonForm onSuccess={onSuccess} />
      </PageLayout>
    </Container>
  );
};
