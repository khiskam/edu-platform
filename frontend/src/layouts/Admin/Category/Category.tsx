import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import { Description } from "@/components";
import { Data } from "@/layouts/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";
import { Category as CategoryType } from "@/shared/types";

export const Category = ({ data }: Data<CategoryType>) => {
  return (
    <>
      <Flex vertical gap={GAP[24]}>
        <Description
          layout="vertical"
          label="Название"
          value={<Typography.Text>{data.name}</Typography.Text>}
        />

        <Description
          layout="vertical"
          label="Описание"
          value={<Typography.Text>{data.description}</Typography.Text>}
        />
      </Flex>
      <NavLink to={`${ROUTES.lessons.name}`}>
        <Button>Перейти к занятиям</Button>
      </NavLink>
    </>
  );
};
