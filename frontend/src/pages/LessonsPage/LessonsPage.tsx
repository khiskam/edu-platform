import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Flex, Pagination, Space, Tag, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { GAP, ROUTES } from "@/shared/constants";
import { Lesson } from "@/shared/types";

const items: Lesson[] = [
  {
    id: "1",
    title: "title 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? 1",
    category_id: "русский язык",
    layout: "layout 1",
  },
  {
    id: "2",
    title: "title 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, dicta? 1",
    category_id: "русский язык",
    layout: "layout 1",
  },
];

export const LessonsPage = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Typography.Title level={2}>Занятия</Typography.Title>
        <Space direction="vertical">
          {items.map((item) => (
            <Card type="inner" title={item.title}>
              <Space direction="vertical">
                <Tag color="blue">{item.category_id}</Tag>
                {item.description}
                <NavLink to={`${ROUTES.lessons}/1`}>
                  <Flex gap={GAP[12]}>
                    Перейти <ArrowRightOutlined />
                  </Flex>
                </NavLink>
              </Space>
            </Card>
          ))}
        </Space>
        <Flex justify="end">
          <Pagination defaultCurrent={1} total={50} />
        </Flex>
      </PageLayout>
    </Container>
  );
};
