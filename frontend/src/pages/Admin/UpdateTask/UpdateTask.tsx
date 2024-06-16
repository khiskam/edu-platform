import Typography from "antd/es/typography";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

export const UpdateTask = () => {
  const { taskId } = useParams();

  if (!taskId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Редактировать задание</Typography.Title>
        <Admin.UpdateTask id={taskId} />
      </PageLayout>
    </Container>
  );
};
