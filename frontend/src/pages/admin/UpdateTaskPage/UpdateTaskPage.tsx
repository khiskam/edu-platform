import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { useSuccessSubmit } from "@/shared/utils";
import { UpdateTaskForm } from "@/widgets";

export const UpdateTaskPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  console.log(isSuccess);

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать задание</Typography.Title>
        <UpdateTaskForm onSuccess={onSuccess} />
      </PageLayout>
    </Container>
  );
};
