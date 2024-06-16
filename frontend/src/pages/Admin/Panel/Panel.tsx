import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { Admin } from "@/layouts";

export const Panel = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Профиль</Typography.Title>

        <Admin.Panel />
      </PageLayout>
    </Container>
  );
};
