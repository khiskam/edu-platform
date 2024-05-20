import { Container, PageLayout, TitleWithButton } from "@/shared/ui";
import { TasksTable } from "@/widgets";

import { CREATE_TASK_ROUTE } from "./constants";

export const Tasks = () => {
  return (
    <Container>
      <PageLayout>
        <TitleWithButton title="Задания" to={CREATE_TASK_ROUTE} />

        <TasksTable />
      </PageLayout>
    </Container>
  );
};
