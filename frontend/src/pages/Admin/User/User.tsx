import Typography from "antd/es/typography";
import { Navigate, useParams } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Admin } from "@/widgets";

export const User = () => {
  const { userId } = useParams();

  if (!userId) {
    return <Navigate to={ROUTES.admin.path} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Профиль</Typography.Title>

        <Admin.User id={userId} />
      </PageLayout>
    </Container>
  );
};
