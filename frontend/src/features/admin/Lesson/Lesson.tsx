import { Button, Flex, Typography } from "antd";
import parse from "html-react-parser";
import { NavLink } from "react-router-dom";

import { Data } from "@/features/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";
import { Lesson as LessonType } from "@/shared/types";

export const Lesson = ({ data }: Data<LessonType>) => {
  return (
    <>
      <Flex vertical gap={GAP[24]}>
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
};
