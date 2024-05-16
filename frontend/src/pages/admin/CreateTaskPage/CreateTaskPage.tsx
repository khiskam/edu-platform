import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { useSuccessSubmit } from "@/shared/utils";
import { CreateTaskForm } from "@/widgets";

export const CreateTaskPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  console.log(isSuccess);

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить задание</Typography.Title>
        <CreateTaskForm onSuccess={onSuccess} />
      </PageLayout>
    </Container>
  );
};
