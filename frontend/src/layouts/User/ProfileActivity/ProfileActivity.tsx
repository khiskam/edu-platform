import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

import { Description, Tracker } from "@/components";
import { GAP } from "@/shared/theme";

import { DescriptionLayout, Layout } from "./styled";
import { ProfileActivityProps } from "./types";

export const ProfileActivity = ({ data }: ProfileActivityProps) => {
  const { monthlyActions, statistics } = data;

  return (
    <Flex gap={GAP[24]} vertical>
      <Typography.Title level={3}>Трекер активностей</Typography.Title>
      <Layout>
        <Tracker data={monthlyActions} />

        <DescriptionLayout>
          <Description
            layout="vertical"
            label="Пройдено занятий за месяц"
            value={statistics.lessonsCompleted}
          />
          <Description
            layout="vertical"
            label="Выполнено заданий за месяц"
            value={statistics.tasksCompleted}
          />
          <Description
            layout="vertical"
            label="Пройдено занятий всего"
            value={statistics.lessonsCompleted}
          />
          <Description
            layout="vertical"
            label="Выполнено заданий всего"
            value={statistics.tasksCompleted}
          />
        </DescriptionLayout>
      </Layout>
    </Flex>
  );
};
