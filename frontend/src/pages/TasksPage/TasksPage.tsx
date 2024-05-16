import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Pagination, Row, Space, Tag, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { GAP, ROUTES } from "@/shared/constants";
import { Task } from "@/shared/types";

const items: Task[] = [
  {
    id: "1",
    title: "title 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? 1",
    category_id: "русский язык",
    answers: [],
  },
  {
    id: "2",
    title: "title 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? 1",
    category_id: "русский язык",
    answers: [],
  },
];

export const TasksPage = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Typography.Title level={2}>Задания</Typography.Title>

        <Row gutter={[GAP[8], GAP[8]]}>
          {items.map((item) => (
            <Col xs={24} md={12} key={item.id}>
              <Card type="inner" title={item.title}>
                <Space direction="vertical">
                  <Tag color="blue">{item.category_id}</Tag>
                  <NavLink to={`${ROUTES.tasks}/1`}>
                    <Flex gap={GAP[12]}>
                      Перейти <ArrowRightOutlined />
                    </Flex>
                  </NavLink>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <Flex justify="end">
          <Pagination defaultCurrent={1} total={50} />
        </Flex>
      </PageLayout>
    </Container>
  );
};
