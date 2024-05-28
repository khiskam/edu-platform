import { Flex, Statistic, Typography } from "antd";
import { StatisticProps } from "antd";
import CountUp from "react-countup";

import { Layout, statistic } from "./styled";

const formatter: StatisticProps["formatter"] = (value) => {
  return <CountUp end={value as number} separator="," />;
};

export const StatisticBadge = () => {
  return (
    <Layout>
      <Flex vertical align="center">
        <Statistic value={800} formatter={formatter} className={statistic} />
        <Typography.Text strong>ПОЛЬЗОВАТЕЛЕЙ</Typography.Text>
      </Flex>

      <Flex vertical align="center">
        <Statistic value={800} formatter={formatter} className={statistic} />
        <Typography.Text strong>ЗАДАНИЙ</Typography.Text>
      </Flex>

      <Flex vertical align="center">
        <Statistic value={800} formatter={formatter} className={statistic} />
        <Typography.Text strong>ЛЕКЦИЙ</Typography.Text>
      </Flex>
    </Layout>
  );
};
