import { Container, Headline, PageLayout } from "@/components";
import { CategoriesTable } from "@/widgets";

import { CREATE_CATEGORY_ROUTE } from "./constants";

export const CategoriesPage = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Headline title="Категории" to={CREATE_CATEGORY_ROUTE} />

        <CategoriesTable />
      </PageLayout>
    </Container>
  );
};
