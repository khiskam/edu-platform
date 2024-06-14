import { PlusOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import { GAP } from "@/shared/theme";

import { TitleWithButtonProps } from "./types";

export const TitleWithButton = ({ title, to }: TitleWithButtonProps) => {
  return (
    <Flex wrap="wrap" justify="space-between" gap={GAP[12]}>
      <Typography.Title level={2}>{title}</Typography.Title>
      <NavLink to={to}>
        <Button type="default" icon={<PlusOutlined />}>
          Добавить
        </Button>
      </NavLink>
    </Flex>
  );
};
