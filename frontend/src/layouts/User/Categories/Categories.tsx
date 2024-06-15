import { Empty, Flex, List, Pagination, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { ProgressBar, Search } from "@/components";
import { ListProps } from "@/layouts/types";
import { CategoryProgress } from "@/shared/api/category/types";
import { usePageParam } from "@/shared/hooks";
import { GAP } from "@/shared/theme";

export const Categories = ({ data, totalCount, isLoading }: ListProps<CategoryProgress>) => {
  const { config } = usePageParam(data, totalCount);

  return (
    <Flex vertical gap={GAP[24]}>
      <Search />
      <Flex vertical gap={GAP[12]}>
        <List
          loading={isLoading}
          dataSource={data}
          locale={{ emptyText: <Empty description="Здесь пока нет категорий..." /> }}
          renderItem={(item) => (
            <List.Item extra={<NavLink to={item.id}>Перейти</NavLink>} style={{ gap: "32px" }}>
              <List.Item.Meta
                title={<Typography.Text style={{ fontSize: "20px" }}>{item.name}</Typography.Text>}
                description={
                  <ProgressBar
                    fullWidth
                    completedCount={item.completedCount}
                    totalCount={item.totalCount}
                  />
                }
              />
            </List.Item>
          )}
        />
      </Flex>

      <Flex justify="end">
        <Pagination {...config} />
      </Flex>
    </Flex>
  );
};
