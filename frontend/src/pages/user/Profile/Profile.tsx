import { Col, List, Row, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { auth } from "@/shared/api";
import { useUserStore } from "@/shared/store";
import { GAP } from "@/shared/theme";

import { ADMIN_PAGES } from "./constants";

export const Profile = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Профиль</Typography.Title>

        <Row gutter={[GAP[32], GAP[32]]}>
          <Col xs={24} md={12} lg={8}>
            <Space direction="vertical">
              <Typography.Text type="secondary">Email</Typography.Text>
              <Typography.Text>{auth.currentUser?.email}</Typography.Text>
            </Space>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Space direction="vertical">
              <Typography.Text type="secondary">Роль</Typography.Text>
              <Typography.Text>
                {useUserStore.getState().auth?.role === "admin" ? "Админ" : "Пользователь"}
              </Typography.Text>
            </Space>
          </Col>
        </Row>

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
