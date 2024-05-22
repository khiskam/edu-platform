import { Button, Flex, Tag, Typography } from "antd";
import parse from "html-react-parser";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { Data } from "@/features/types";
import { LessonWithProgress } from "@/shared/api/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";
import { ProgressBar } from "@/shared/ui";

export const Lesson = forwardRef<HTMLDivElement, Data<LessonWithProgress>>(({ data }, ref) => {
  return (
    <>
      <Flex vertical ref={ref} gap={GAP[24]}>
        <Flex vertical gap={GAP[4]} align="start">
          <Typography.Text type="secondary">Просмотр</Typography.Text>
          <Tag color="blue">{data.isCompleted ? "Просмотрено" : "Не просмотрено"}</Tag>
        </Flex>

        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Прогресс</Typography.Text>
          <ProgressBar completedCount={data.completedCount} totalCount={data.totalCount} />
        </Flex>

        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Название</Typography.Text>
          <Typography.Text>{data.title}</Typography.Text>
        </Flex>

        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Описание</Typography.Text>
          <Typography.Text>{data.description}</Typography.Text>
        </Flex>

        <Flex vertical gap={GAP[4]}>
          <Typography.Text type="secondary">Описание</Typography.Text>
          <div>{parse(data.layout)}</div>
        </Flex>
      </Flex>
      <NavLink to={`${ROUTES.tasks.name}`}>
        <Button>Перейти к заданиям</Button>
      </NavLink>
    </>
  );
});
