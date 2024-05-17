import { Container, PageLayout, TitleWithButton } from "@/shared";
import { CategoriesTable } from "@/widgets";

import { CREATE_CATEGORY_ROUTE } from "./contstants";

export const Categories = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <TitleWithButton title="Категории" to={CREATE_CATEGORY_ROUTE} />

        <CategoriesTable />
      </PageLayout>
    </Container>
  );
};
