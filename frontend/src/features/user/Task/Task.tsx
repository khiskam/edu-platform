import { Space, Typography } from "antd";
import { useForm } from "react-hook-form";

import { Fields, Task as TaskType } from "@/shared";
import { TaskSelectData } from "@/shared/types/task";

import { DataType } from "../types";
import { Variant } from "./styled";

export const Task = ({ data }: DataType<TaskType>) => {
  const { control } = useForm<TaskSelectData>();

  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>{data.title}</Typography.Title>

      <Typography.Text>{data.description}</Typography.Text>

      {data.answers.map((item) => (
        <Fields.Checkbox
          control={{ control, name: "answers" }}
          label={<Variant>{item.value}</Variant>}
        />
      ))}
    </Space>
  );
};