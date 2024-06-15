import { CheckCircleOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Empty, Flex, List, Pagination, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { Search } from "@/components";
import { ListProps } from "@/layouts/types";
import { TaskProgress } from "@/shared/api/task/types";
import { usePageParam } from "@/shared/hooks";
import { GAP } from "@/shared/theme";

export const Tasks = ({ data, totalCount }: ListProps<TaskProgress>) => {
  const { config } = usePageParam(data, totalCount);
  const theme = useTheme();

  return (
    <Flex vertical gap={GAP[24]}>
      <Search />
      <List
        dataSource={data}
        locale={{ emptyText: <Empty description="Здесь пока нет заданий..." /> }}
        renderItem={(item) => (
          <List.Item extra={<NavLink to={item.id}>Парейти</NavLink>} style={{ gap: "32px" }}>
            <List.Item.Meta
              title={
                <Flex gap={12}>
                  <CheckCircleOutlined
                    style={{ color: item.isCompleted ? theme.colorSuccess : theme.colorText }}
                  />
                  <Typography.Text style={{ fontSize: "20px" }}>{item.title}</Typography.Text>
                </Flex>
              }
            />
          </List.Item>
        )}
      />

      <Flex justify="end">
        <Pagination {...config} />
      </Flex>
    </Flex>
  );
};