import { Card, Empty, Flex, Pagination, Tag } from "antd";
import { NavLink } from "react-router-dom";

import { TaskWithProgress } from "@/shared/api";
import { usePageParam } from "@/shared/hooks";
import { GAP } from "@/shared/theme";

import { ListProps } from "../types";

export const TasksList = ({ data, totalCount }: ListProps<TaskWithProgress>) => {
  const { config } = usePageParam(data, totalCount);

  if (data?.length === 0) {
    return <Empty description="Здесь пока нет заданий" />;
  }

  return (
    <Flex vertical gap={GAP[32]}>
      <Flex vertical gap={GAP[12]}>
        {data?.map((item) => (
          <Card key={item.id} title={item.title} extra={<NavLink to={item.id}>Парейти</NavLink>}>
            {item.isCompleted ? (
              <Tag color="blue">Выполнено</Tag>
            ) : (
              <Tag color="red">Необходимо выполнить</Tag>
            )}
          </Card>
        ))}
      </Flex>

      <Flex justify="end">
        <Pagination {...config} />
      </Flex>
    </Flex>
  );
};
