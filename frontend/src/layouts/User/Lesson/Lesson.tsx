import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Tag from "antd/es/tag";
import Typography from "antd/es/typography";
import parse from "html-react-parser";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { Description, ProgressBar } from "@/components";
import { Data } from "@/layouts/types";
import { LessonProgress } from "@/shared/api/lesson/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";

export const Lesson = forwardRef<HTMLDivElement, Data<LessonProgress>>(({ data }, ref) => {
  return (
    <>
      <Flex vertical gap={GAP[24]} align="start">
        <Description
          layout="vertical"
          label="Просмотр"
          value={
            data.isCompleted ? (
              <Tag color="blue">{"Просмотрено"}</Tag>
            ) : (
              <Tag color="red">{"Не просмотрено"}</Tag>
            )
          }
        />
        <Description
          layout="vertical"
          label="Прогресс"
          value={<ProgressBar completedCount={data.completedCount} totalCount={data.totalCount} />}
        />
        <Description
          layout="vertical"
          label="Название"
          value={<Typography.Text>{data.title}</Typography.Text>}
        />
        <Description
          layout="vertical"
          label="Описание"
          value={<Typography.Text>{data.description}</Typography.Text>}
        />
        <Description layout="vertical" label="Разметка" value={<div>{parse(data.layout)}</div>} />
      </Flex>
      <div ref={ref}></div>
      <NavLink to={`${ROUTES.tasks.name}`}>
        <Button>Перейти к заданиям</Button>
      </NavLink>
    </>
  );
});
