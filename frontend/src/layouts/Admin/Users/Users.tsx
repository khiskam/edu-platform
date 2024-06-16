import Empty from "antd/es/empty";
import Flex from "antd/es/flex";
import List from "antd/es/list";
import Pagination from "antd/es/pagination";
import Typography from "antd/es/typography";
import { NavLink } from "react-router-dom";

import { Search } from "@/components";
import { ListProps } from "@/layouts/types";
import { usePageParam } from "@/shared/hooks";
import { GAP } from "@/shared/theme";
import { User } from "@/shared/types";

export const Users = ({ data, totalCount, isLoading }: ListProps<User & { email?: string }>) => {
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
                title={
                  <Typography.Text>
                    {item.firstName} {item.lastName}
                    {item.email ? ` (${item.email})` : ""}
                  </Typography.Text>
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
