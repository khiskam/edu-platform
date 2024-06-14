import Empty from "antd/es/empty";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import Tag from "antd/es/tag";
import Typography from "antd/es/typography";

import { CategoryApi } from "@/shared/api";
import { GAP } from "@/shared/theme";

import { Section } from "../styled";
import { skeleton, skeletonTitle, tag } from "./styled";
import { CategoriesListProps } from "./types";

export const Categories = () => {
  const { data, isLoading } = CategoryApi.useGetAllQuery("0");

  return (
    <Section>
      <Typography.Title level={2}>Категории</Typography.Title>

      <CategoriesList isLoading={isLoading} categories={data?.categories} />
    </Section>
  );
};

const CategoriesList = ({ isLoading, categories }: CategoriesListProps) => {
  if (isLoading) {
    return (
      <Flex wrap="wrap" gap={GAP[8]}>
        <CategoriesSkeleton />
      </Flex>
    );
  } else if (categories?.length === 0) {
    return <Empty description={"Здесь пока нет категорий, но скоро будут..."} />;
  } else {
    return (
      <Flex wrap="wrap" gap={GAP[8]}>
        {categories?.map((value) => (
          <Tag color={"blue"} key={value.id} className={tag}>
            {value.name}
          </Tag>
        ))}
      </Flex>
    );
  }
};

const CategoriesSkeleton = () => {
  const calcWidth = () => {
    return 100 + Math.floor(Math.random() * 41) + 10;
  };

  return Array.from({ length: 12 }).map((_, idx) => (
    <Skeleton
      title={{
        width: `${calcWidth()}px`,
        className: skeletonTitle,
      }}
      paragraph={false}
      className={skeleton}
      active
      key={idx}
    />
  ));
};
