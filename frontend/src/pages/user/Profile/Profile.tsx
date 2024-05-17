import { List, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/shared";

import { ADMIN_PAGES } from "./constants";

export const Profile = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Профиль</Typography.Title>
        <List
          bordered
          dataSource={ADMIN_PAGES}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.title}</Typography.Text>
              <NavLink to={item.route}>Перейти</NavLink>
            </List.Item>
          )}
        />
      </PageLayout>
    </Container>
  );
};
