import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { HeadlineProps } from "./types";

export const Headline = ({ title, to }: HeadlineProps) => {
  return (
    <Flex wrap="wrap" justify="space-between">
      <Typography.Title level={2}>{title}</Typography.Title>
      <NavLink to={to}>
        <Button type="default" icon={<PlusOutlined />}>
          Добавить
        </Button>
      </NavLink>
    </Flex>
  );
};
