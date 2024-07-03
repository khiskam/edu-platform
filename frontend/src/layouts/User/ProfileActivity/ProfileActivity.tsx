import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

import { Description, Tracker } from "@/components";
import { GAP } from "@/shared/theme";

import { useStatistics } from "./hooks";
import { DescriptionLayout, Layout } from "./styled";
import { ProfileActivityProps } from "./types";

export const ProfileActivity = ({ data }: ProfileActivityProps) => {
  const { monthlyActions, statistics } = data;

  const monthlyStatistics = useStatistics(monthlyActions);

  return (
    <Flex gap={GAP[24]} vertical>
      <Typography.Title level={3}>Трекер активностей</Typography.Title>
      <Layout>
        <Tracker data={monthlyActions} />

        <DescriptionLayout>
          <Description
            layout="vertical"
            label="Пройдено занятий за месяц"
            value={<Typography.Text>{monthlyStatistics.lessonsCompleted}</Typography.Text>}
          />
          <Description
            layout="vertical"
            label="Выполнено заданий за месяц"
            value={<Typography.Text>{monthlyStatistics.tasksCompleted}</Typography.Text>}
          />
          <Description
            layout="vertical"
            label="Пройдено занятий всего"
            value={<Typography.Text>{statistics.lessonsCompleted}</Typography.Text>}
          />
          <Description
            layout="vertical"
            label="Выполнено заданий всего"
            value={<Typography.Text>{statistics.tasksCompleted}</Typography.Text>}
          />
        </DescriptionLayout>
      </Layout>
    </Flex>
  );
};
