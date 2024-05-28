import { Empty, Flex, Tag, Typography } from "antd";

import { GAP } from "@/shared/theme";

import { Section } from "../styled";
import { tag } from "./styled";

const categories: string[] = [];

export const Categories = () => {
  return (
    <Section>
      <Typography.Title level={2}>Категории</Typography.Title>

      {categories.length === 0 ? (
        <Empty description={"Здесь пока нет категорий, но скоро будут..."} />
      ) : (
        <Flex wrap="wrap" gap={GAP[8]}>
          {categories.map((item) => (
            <Tag color={"blue"} key={item} className={tag}>
              {item}
            </Tag>
          ))}
        </Flex>
      )}
    </Section>
  );
};
