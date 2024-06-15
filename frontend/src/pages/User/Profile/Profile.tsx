import Avatar from "antd/es/avatar";
import Divider from "antd/es/divider";
import Empty from "antd/es/empty";
import Spin from "antd/es/spin";
import Typography from "antd/es/typography";

import { Container, Description, PageLayout, Tracker } from "@/components";
import { auth, UserApi } from "@/shared/api";
import { COLORS } from "@/shared/theme/constants";

export const Profile = () => {
  const { data, isLoading } = UserApi.useGetOneQuery();

  if (isLoading) {
    return <Spin />;
  }

  if (!data) {
    return <Empty description={"Не получилось получить данные о пользователе ..."} />;
  }

  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Профиль</Typography.Title>

        <Avatar size={140} style={{ backgroundColor: COLORS.orange, fontSize: "48px" }}>
          {data.user.firstName[0].toUpperCase()}
          {data.user.lastName[0].toUpperCase()}
        </Avatar>

        <Description layout="vertical" label="Имя" value={data.user.firstName} />
        <Description layout="vertical" label="Фамилия" value={data.user.lastName} />
        <Description layout="vertical" label="Email" value={auth.currentUser?.email} />
        <Description
          layout="vertical"
          label="Роль"
          value={data.user.role === "admin" ? "Админимстратор" : "Студент"}
        />

        <Divider />

        <Typography.Title level={2}>Редактировать профиль</Typography.Title>
        <Divider />
        <Typography.Title level={2}>Трекер активности</Typography.Title>
        <Tracker data={data.user.monthlyActions} />
      </PageLayout>
    </Container>
  );
};
