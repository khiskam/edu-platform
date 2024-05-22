import { Typography } from "antd";

import { Container, PageLayout } from "@/shared/ui";
import { User } from "@/widgets";

const { CategoriesList } = User;

export const Categories = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Typography.Title level={2}>Категории</Typography.Title>

        <CategoriesList />
      </PageLayout>
    </Container>
  );
};
