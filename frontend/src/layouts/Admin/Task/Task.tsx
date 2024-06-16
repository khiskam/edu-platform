import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

import { Description } from "@/components";
import { Data } from "@/layouts/types";
import { GAP } from "@/shared/theme";
import { TaskDataWithAnswers } from "@/shared/types/task";

export const Task = ({ data }: Data<TaskDataWithAnswers>) => {
  return (
    <>
      <Description
        layout="vertical"
        label="Название"
        value={<Typography.Text>{data.title}</Typography.Text>}
      />

      <Description
        layout="vertical"
        label="Описание"
        value={<Typography.Text>{data.description}</Typography.Text>}
      />

      <Description
        layout="vertical"
        label="Ответы"
        value={data.answers.map((item, idx) => (
          <Flex align="center" gap={GAP[12]} key={idx}>
            {item.isCorrect ? <PlusCircleOutlined /> : <MinusCircleOutlined />}
            <Typography.Text>{item.value}</Typography.Text>
          </Flex>
        ))}
      />
    </>
  );
};
