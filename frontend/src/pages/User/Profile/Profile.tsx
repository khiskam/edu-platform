import Typography from "antd/es/typography";

import { Container, PageLayout } from "@/components";
import { User } from "@/widgets";

export const Profile = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Профиль</Typography.Title>

        <User.Profile />
      </PageLayout>
    </Container>
  );
};
