import { Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { useSuccessSubmit } from "@/shared/utils";
import { UpdateCategoryForm } from "@/widgets";

export const UpdateCategoryPage = () => {
  const { isSuccess, onSuccess } = useSuccessSubmit();

  console.log(isSuccess);

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать категорию</Typography.Title>

        <UpdateCategoryForm onSuccess={onSuccess} />
      </PageLayout>
    </Container>
  );
};
