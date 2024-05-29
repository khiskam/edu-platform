import { Card, Empty, Flex, Pagination, Typography } from "antd";
import { NavLink } from "react-router-dom";

import { ProgressBar } from "@/components";
import { LessonWithProgress } from "@/shared/api/types";
import { usePageParam } from "@/shared/hooks";
import { GAP } from "@/shared/theme";

import { ListProps } from "../types";

export const LessonsList = ({ data, totalCount }: ListProps<LessonWithProgress>) => {
  const { config } = usePageParam(data, totalCount);

  if (data?.length === 0) {
    return <Empty description="Здесь пока нет занятий" />;
  }

  return (
    <Flex vertical gap={GAP[32]}>
      <Flex vertical gap={GAP[12]}>
        {data?.map((item) => (
          <Card key={item.id} title={item.title} extra={<NavLink to={item.id}>Парейти</NavLink>}>
            <Flex vertical gap={GAP[12]}>
              <Typography.Text>{item.description}</Typography.Text>
              <ProgressBar
                fullWidth
                completedCount={item.completedCount}
                totalCount={item.totalCount}
              />
            </Flex>
          </Card>
        ))}
      </Flex>

      <Flex justify="end">
        <Pagination {...config} />
      </Flex>
    </Flex>
  );
};
