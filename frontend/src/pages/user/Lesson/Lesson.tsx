import { Typography } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { ROUTES } from "@/shared/routes";
import { Container, PageLayout } from "@/shared/ui";
import { User } from "@/widgets";

const { Lesson: LessonWidget } = User;

export const Lesson = () => {
  const { lessonId } = useParams();

  if (!lessonId) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Занятие</Typography.Title>

        <LessonWidget id={lessonId} />
      </PageLayout>
    </Container>
  );
};
