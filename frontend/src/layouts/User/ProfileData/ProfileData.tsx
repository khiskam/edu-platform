import Avatar from "antd/es/avatar";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

import { Description } from "@/components";
import { GAP } from "@/shared/theme";

import { avatar, DescriptionLayout, Layout } from "./styled";
import { ProfileDataProps } from "./types";

export const ProfileData = ({ data }: ProfileDataProps) => {
  const { firstName, lastName, role, email } = data;

  return (
    <Flex gap={GAP[24]} vertical>
      <Typography.Title level={3}>Информация о пользователе</Typography.Title>
      <Layout>
        <Avatar size={140} className={avatar}>
          {firstName[0]}
          {lastName[0]}
        </Avatar>

        <DescriptionLayout>
          <Description
            layout="vertical"
            label="Имя"
            value={<Typography.Text>{firstName}</Typography.Text>}
          />
          <Description
            layout="vertical"
            label="Фамилия"
            value={<Typography.Text>{lastName}</Typography.Text>}
          />
          {email && (
            <Description
              layout="vertical"
              label="Email"
              value={<Typography.Text>{email}</Typography.Text>}
            />
          )}
          <Description
            layout="vertical"
            label="Роль"
            value={
              <Typography.Text>{role === "admin" ? "Администратор" : "Студент"}</Typography.Text>
            }
          />
        </DescriptionLayout>
      </Layout>
    </Flex>
  );
};
