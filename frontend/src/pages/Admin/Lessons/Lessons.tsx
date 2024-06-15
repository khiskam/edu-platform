import { Container, PageLayout, TitleWithButton } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

const { LessonsTable } = Admin;

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
