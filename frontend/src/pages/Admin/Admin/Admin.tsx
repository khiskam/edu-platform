import List from "antd/es/list";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/components";

import { ADMIN_PAGES } from "./constants";

export const Admin = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Админ-панель</Typography.Title>
        <List
          dataSource={ADMIN_PAGES}
          renderItem={(item) => (
            <List.Item extra={<NavLink to={item.path}>Перейти</NavLink>}>
              <Typography.Text>{item.label}</Typography.Text>
            </List.Item>
          )}
        />
      </PageLayout>
    </Container>
  );
};
