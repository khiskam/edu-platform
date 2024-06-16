import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { Admin } from "@/widgets";

export const Users = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Пользователи</Typography.Title>

        <Admin.Users />
      </PageLayout>
    </Container>
  );
};
