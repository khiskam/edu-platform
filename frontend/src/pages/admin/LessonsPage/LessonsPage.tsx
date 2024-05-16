import { Container, Headline, PageLayout } from "@/components";
import { TasksTable } from "@/widgets";

import { CREATE_LESSON_ROUTE } from "./constants";

export const LessonsPage = () => {
  return (
    <Container>
      <PageLayout>
        <Headline title="Задания" to={CREATE_LESSON_ROUTE} />

        <TasksTable />
      </PageLayout>
    </Container>
  );
};
