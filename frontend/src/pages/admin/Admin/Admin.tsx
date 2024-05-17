import { List, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/shared";

import { ADMIN_PAGES } from "./constants";

export const Admin = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Админ-панель</Typography.Title>
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