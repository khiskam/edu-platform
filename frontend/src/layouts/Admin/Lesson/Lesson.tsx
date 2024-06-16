import { useTheme } from "@emotion/react";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import parse from "html-react-parser";
import { NavLink } from "react-router-dom";

import { Description } from "@/components";
import { Data } from "@/layouts/types";
import { ROUTES } from "@/shared/routes";
import { GAP } from "@/shared/theme";
import { Lesson as LessonType } from "@/shared/types";

import { text } from "./styled";

export const Lesson = ({ data }: Data<LessonType>) => {
  const theme = useTheme();

  return (
    <>
      <Flex vertical gap={GAP[24]}>
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
        <Description
          layout="vertical"
          label="Разметка"
          value={<div className={text(theme)}>{parse(data.layout)}</div>}
        />
      </Flex>

      <NavLink to={`${ROUTES.tasks.name}`}>
        <Button>Перейти к заданиям</Button>
      </NavLink>
    </>
  );
};
