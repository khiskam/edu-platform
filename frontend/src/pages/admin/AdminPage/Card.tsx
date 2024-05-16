import { ArrowRightOutlined } from "@ant-design/icons";
import { Card as AntdCard, Flex } from "antd";
import { NavLink } from "react-router-dom";

import { GAP } from "@/shared/constants";

import { CardProps } from "./types";

export const Card = ({ title, icon, route }: CardProps) => {
  return (
    <AntdCard
      type="inner"
      title={
        <Flex gap={GAP[12]}>
          {icon} {title}
        </Flex>
      }
    >
      <NavLink to={route}>
        <Flex gap={GAP[12]}>
          Перейти
          <ArrowRightOutlined />
        </Flex>
      </NavLink>
    </AntdCard>
  );
};
