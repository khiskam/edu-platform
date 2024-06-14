import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import Statistic, { StatisticProps } from "antd/es/statistic";
import Typography from "antd/es/typography";
import CountUp from "react-countup";

import { StatisticsApi } from "@/shared/api";

import { Layout, statistic } from "./styled";
import { StatisticsElementProps } from "./types";

const formatter: StatisticProps["formatter"] = (value) => {
  return <CountUp end={value as number} separator="," />;
};

export const StatisticBadge = () => {
  const { data, isLoading } = StatisticsApi.useGetOneQuery();

  return (
    <Layout>
      <StatisticsElement
        isLoading={isLoading}
        value={data?.statistics.usersCount}
        title="ПОЛЬЗОВАТЕЛЕЙ"
      />

      <StatisticsElement
        isLoading={isLoading}
        value={data?.statistics.categoriesCount}
        title="КАТЕГОРИЙ"
      />
      <StatisticsElement
        isLoading={isLoading}
        value={data?.statistics.lessonsCount}
        title="ЗАНЯТИЙ"
      />
      <StatisticsElement
        isLoading={isLoading}
        value={data?.statistics.tasksCount}
        title="ЗАДАНИЙ"
      />
    </Layout>
  );
};

export const StatisticsElement = ({ isLoading, value, title }: StatisticsElementProps) => {
  if (isLoading) {
    return (
      <Flex vertical align="center" justify="center">
        <Skeleton
          title={{ style: { height: "24px", width: "40px" } }}
          paragraph={false}
          loading={isLoading}
          active
          style={{ width: "auto" }}
        />
        <Skeleton
          title={false}
          paragraph={{ rows: 1, width: "100px", style: { margin: 0 } }}
          loading={isLoading}
          active
        />
      </Flex>
    );
  }

  return (
    <Flex vertical align="center">
      <Statistic value={value} formatter={formatter} className={statistic} />
      <Typography.Text strong>{title}</Typography.Text>
    </Flex>
  );
};
