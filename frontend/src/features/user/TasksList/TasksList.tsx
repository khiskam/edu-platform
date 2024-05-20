import { ConfigProvider, List, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Task } from "@/shared/types";

import { ListProps } from "../types";
import { toTaskPage } from "./utils";

export const TasksList = ({ data }: ListProps<Task>) => {
  return (
    <ConfigProvider renderEmpty={() => "Здесь пока нет заданий..."}>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.title}</Typography.Text>
            <NavLink to={toTaskPage(item.id)}>Перейти</NavLink>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};
