import List from "antd/es/list";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/components";

import { ACCOUNT_PAGES } from "./constants";

export const Account = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Личный кабинет</Typography.Title>

        <List
          dataSource={ACCOUNT_PAGES}
          renderItem={(item) => (
            <List.Item extra={<NavLink to={item.path}>Перейти</NavLink>}>{item.label}</List.Item>
          )}
        />
      </PageLayout>
    </Container>
  );
};
