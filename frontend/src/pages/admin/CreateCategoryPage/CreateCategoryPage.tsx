import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { useSuccessSubmit } from "@/shared/utils";
import { CreateCategoryForm } from "@/widgets";

export const CreateCategoryPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  console.log(isSuccess);

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Добавить категорию</Typography.Title>
        <CreateCategoryForm onSuccess={onSuccess} />
      </PageLayout>
    </Container>
  );
};
