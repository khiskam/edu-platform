import Empty from "antd/es/empty";
import Flex from "antd/es/flex";
import Tooltip from "antd/es/tooltip";
import Typography from "antd/es/typography";

import { Description } from "../Description";
import { TrackerItem, TrackerLayout } from "./styled";
import { TrackerProps } from "./types";
import { getType, isTooltip } from "./utils";

const WEEK_NAME = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export const Tracker = ({ data }: TrackerProps) => {
  if (data.length === 0) {
    return <Empty description="Не получилось получить данные активности" />;
  }

  const weekNumber = new Date(data[0].date).getDay();

  return (
    <div style={{ overflow: "hidden" }}>
      <TrackerLayout>
        {WEEK_NAME.map((value) => (
          <TrackerItem key={value}>
            <Typography.Text>{value}</Typography.Text>
          </TrackerItem>
        ))}

        {Array.from({ length: weekNumber - 1 }).map((_, idx) => (
          <TrackerItem key={idx} />
        ))}

        {data.map((value) =>
          isTooltip(value.date) ? (
            <Tooltip
              color="white"
              title={
                <Flex vertical style={{ padding: "8px" }}>
                  <Description
                    label="Дата"
                    value={<Typography.Text>{value.date}</Typography.Text>}
                  />
                  <Description
                    label="Пройдено занятий"
                    value={<Typography.Text>{value.lessonsCompleted}</Typography.Text>}
                  />
                  <Description
                    label="Сделано заданий"
                    value={<Typography.Text>{value.tasksCompleted}</Typography.Text>}
                  />
                </Flex>
              }
              key={value.date}
            >
              <TrackerItem type={getType(value)} />
            </Tooltip>
          ) : (
            <TrackerItem type="gray" key={value.date} />
          )
        )}
      </TrackerLayout>
    </div>
  );
};
