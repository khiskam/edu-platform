import Card from "antd/es/card";
import Empty from "antd/es/empty";
import Flex from "antd/es/flex";
import Pagination from "antd/es/pagination";
import { NavLink } from "react-router-dom";

import { ProgressBar } from "@/components";
import { CategoryWithProgress } from "@/shared/api/types";
import { usePageParam } from "@/shared/hooks";
import { GAP } from "@/shared/theme";

import { ListProps } from "../types";

export const CategoriesList = ({ data, totalCount }: ListProps<CategoryWithProgress>) => {
  const { config } = usePageParam(data, totalCount);

  if (data?.length === 0) {
    return <Empty description="Здесь пока нет категорий" />;
  }

  return (
    <Flex vertical gap={GAP[32]}>
      <Flex vertical gap={GAP[12]}>
        {data?.map((item) => (
          <Card key={item.id} title={item.name} extra={<NavLink to={item.id}>Парейти</NavLink>}>
            <Flex vertical gap={GAP[12]}>
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
