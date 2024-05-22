import { Button, Flex, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Data } from "@/features/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";
import { Category as CategoryType } from "@/shared/types";

export const Category = ({ data }: Data<CategoryType>) => {
  return (
    <>
      <Flex vertical gap={GAP[24]}>
        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Название</Typography.Text>
          <Typography.Text>{data.name}</Typography.Text>
        </Flex>
      </Flex>
      <NavLink to={`${ROUTES.lessons.name}`}>
        <Button>Перейти к занятиям</Button>
      </NavLink>
    </>
  );
};
