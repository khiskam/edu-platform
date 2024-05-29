import { Button, Flex, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { ProgressBar } from "@/components";
import { Data } from "@/features/types";
import { CategoryWithProgress } from "@/shared/api/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

export const Category = ({ data }: Data<CategoryWithProgress>) => {
  return (
    <>
      <Flex vertical gap={GAP[24]}>
        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Название</Typography.Text>
          <Typography.Text>{data.name}</Typography.Text>
        </Flex>

        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Прогресс</Typography.Text>
          <ProgressBar completedCount={data.completedCount} totalCount={data.totalCount} />
        </Flex>
      </Flex>
      <NavLink to={`${ROUTES.lessons.name}`}>
        <Button>Перейти к занятиям</Button>
      </NavLink>
    </>
  );
};
