import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { User } from "@/layouts";

export const Account = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Личный кабинет</Typography.Title>

        <User.Account />
      </PageLayout>
    </Container>
  );
};
