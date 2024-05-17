import { ConfigProvider, List, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Lesson } from "@/shared";

import { ListProps } from "../types";
import { toLessonPage } from "./utils";

export const LessonsList = ({ data }: ListProps<Lesson>) => {
  return (
    <ConfigProvider renderEmpty={() => "Здесь пока нет занятий..."}>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.title}</Typography.Text>
            <NavLink to={toLessonPage(item.id)}>Перейти</NavLink>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};
