import { Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { Container, PageLayout } from "@/shared/ui";
import { User } from "@/widgets";

const { LessonsList } = User;

export const Lessons = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Занятия</Typography.Title>

        <LessonsList id={categoryId} />
      </PageLayout>
    </Container>
  );
};
