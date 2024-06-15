import { Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { User } from "@/widgets";

export const Tasks = () => {
  const { lessonId } = useParams();

  if (!lessonId) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Задания</Typography.Title>

        <User.Tasks id={lessonId} />
      </PageLayout>
    </Container>
  );
};
