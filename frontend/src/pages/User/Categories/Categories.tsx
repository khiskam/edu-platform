import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { User } from "@/widgets";

export const Categories = () => {
  return (
    <Container>
      <PageLayout height="fit-content">
        <Typography.Title level={2}>Категории</Typography.Title>

        <User.Categories />
      </PageLayout>
    </Container>
  );
};
