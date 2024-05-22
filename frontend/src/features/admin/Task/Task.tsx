import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";

import { Data } from "@/features/types";
import { GAP } from "@/shared/theme";
import { Task as TaskType } from "@/shared/types";

export const Task = ({ data }: Data<TaskType>) => {
  return (
    <>
      <Flex vertical gap={GAP[24]}>
        <Typography.Text type="secondary">Название</Typography.Text>
        <Typography.Text>{data.title}</Typography.Text>
      </Flex>

      <Flex vertical gap={GAP[24]}>
        <Typography.Text type="secondary">Описание</Typography.Text>
        <Typography.Text>{data.description}</Typography.Text>
      </Flex>

      <Flex vertical gap={GAP[24]}>
        <Typography.Text type="secondary">Ответы</Typography.Text>
        {data.answers.map((item, idx) => (
          <Flex align="center" gap={GAP[12]} key={idx}>
            {item.isCorrect ? <CheckSquareOutlined /> : <BorderOutlined />}
            <Typography.Text>{item.value}</Typography.Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
