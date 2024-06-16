import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout, TitleWithButton } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

export const Lessons = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return (
    <Container>
      <PageLayout>
        <TitleWithButton title="Задания" to={ROUTES.create.name} />

        <Admin.Lessons id={categoryId} />
      </PageLayout>
    </Container>
  );
};
