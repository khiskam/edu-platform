import Typography from "antd/es/typography";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
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
