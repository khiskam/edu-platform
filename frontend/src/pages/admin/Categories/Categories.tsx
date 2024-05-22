import { Container, PageLayout, TitleWithButton } from "@/shared/ui";
import { Admin } from "@/widgets";

import { CREATE_CATEGORY_ROUTE } from "./contstants";

const { CategoriesTable } = Admin;

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
