import { ConfigProvider, List, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Category } from "@/shared/types";

import { ListProps } from "../types";
import { toCategoryPage } from "./utils";

export const CategoriesList = ({ data }: ListProps<Category>) => {
  return (
    <ConfigProvider renderEmpty={() => "Здесь пока нет категорий..."}>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.name}</Typography.Text>
            <NavLink to={toCategoryPage(item.id)}>Перейти</NavLink>
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
};
