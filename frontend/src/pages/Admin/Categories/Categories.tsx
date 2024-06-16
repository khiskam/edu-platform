import { Container, PageLayout, TitleWithButton } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

export const Categories = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <TitleWithButton title="Категории" to={ROUTES.create.name} />

        <Admin.Categories />
      </PageLayout>
    </Container>
  );
};
