import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, CollapseProps, Flex, Pagination, Space, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Container, PageLayout } from "@/components";
import { GAP, ROUTES } from "@/shared/constants";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  
`;

const items: CollapseProps["items"] = [
  {
    id: "1",
    label: "Задание 1",
    children: (
      <NavLink to={`${ROUTES.lessons}/1`}>
        <Flex gap={GAP[12]}>
          Перейти <ArrowRightOutlined />
        </Flex>
      </NavLink>
    ),
  },
  {
    id: "2",
    label: "Задание 2",
    children: <p>{text}</p>,
  },
  {
    id: "3",
    label: "Задание 2",
    children: <p>{text}</p>,
  },
];

export const LessonsPage = () => {
  return (
    <Container>
      <PageLayout height="full-height">
        <Typography.Title level={2}>Занятия</Typography.Title>
        <Space direction="vertical">
          {items.map((item) => (
            <Card type="inner" title={item.label}>
              {item.children}
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
