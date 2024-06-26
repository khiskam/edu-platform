import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import { Description, ProgressBar } from "@/components";
import { Data } from "@/layouts/types";
import { CategoryProgress } from "@/shared/api/category/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

export const Category = ({ data }: Data<CategoryProgress>) => {
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
        <Description
          layout="vertical"
          label="Прогресс"
          value={<ProgressBar completedCount={data.completedCount} totalCount={data.totalCount} />}
        />
      </Flex>
      <NavLink to={`${ROUTES.lessons.name}`}>
        <Button>Перейти к занятиям</Button>
      </NavLink>
    </>
  );
};
