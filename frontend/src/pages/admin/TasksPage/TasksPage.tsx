import { Container, Headline, PageLayout } from "@/components";
import { TasksTable } from "@/widgets";

import { CREATE_TASK_ROUTE } from "./constants";

export const TasksPage = () => {
  return (
    <Container>
      <PageLayout>
        <Headline title="Задания" to={CREATE_TASK_ROUTE} />

        <TasksTable />
      </PageLayout>
    </Container>
  );
};
