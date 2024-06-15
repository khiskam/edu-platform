import Typography from "antd/es/typography";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
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
