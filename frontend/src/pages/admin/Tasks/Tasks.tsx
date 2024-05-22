import { ROUTES } from "@/shared/routes";
import { Container, PageLayout, TitleWithButton } from "@/shared/ui";
import { Admin } from "@/widgets";

const { TasksTable } = Admin;

export const Tasks = () => {
  return (
    <Container>
      <PageLayout>
        <TitleWithButton title="Задания" to={ROUTES.create.name} />

        <TasksTable />
      </PageLayout>
    </Container>
  );
};
