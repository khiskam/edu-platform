import { Container, PageLayout, TitleWithButton } from "@/shared";
import { LessonsTable } from "@/widgets";

import { CREATE_LESSON_ROUTE } from "./constants";

export const Lessons = () => {
  return (
    <Container>
      <PageLayout>
        <TitleWithButton title="Задания" to={CREATE_LESSON_ROUTE} />

        <LessonsTable />
      </PageLayout>
    </Container>
  );
};
