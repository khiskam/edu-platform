import { Col, Row, Typography } from "antd";

import { Container, PageLayout } from "@/components";
import { GAP } from "@/shared/constants";

import { Card } from "./Card";
import { ADMIN } from "./constants";

export const AdminPage = () => {
  return (
    <Container>
      <PageLayout>
        <Typography.Title level={2}>Админ-панель</Typography.Title>
        <Row gutter={[GAP[8], GAP[8]]}>
          {ADMIN.map((item) => (
            <Col xs={24} md={12} lg={8}>
              <Card {...item} />
            </Col>
          ))}
        </Row>
      </PageLayout>
    </Container>
  );
};
