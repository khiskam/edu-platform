import { ROUTES } from "@/shared/routes";
import { Container, PageLayout, TitleWithButton } from "@/shared/ui";
import { LessonsTable } from "@/widgets";

export const Lessons = () => {
  return (
    <Container>
      <PageLayout>
        <TitleWithButton title="Задания" to={ROUTES.create.name} />

        <LessonsTable />
      </PageLayout>
    </Container>
  );
};
