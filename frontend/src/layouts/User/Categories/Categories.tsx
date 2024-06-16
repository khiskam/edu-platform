import Empty from "antd/es/empty";
import Flex from "antd/es/flex";
import List from "antd/es/list";
import Pagination from "antd/es/pagination";
import Typography from "antd/es/typography";
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
                  <Flex vertical gap={GAP[4]} style={{ margin: "12px 0 0" }}>
                    <Typography.Text>{item.description}</Typography.Text>
                    <ProgressBar
                      fullWidth
                      completedCount={item.completedCount}
                      totalCount={item.totalCount}
                    />
                  </Flex>
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
