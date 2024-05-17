import { Space, Typography } from "antd";

import { Lesson as LessonType } from "@/shared";

import { DataType } from "../types";

export const Lesson = ({ data }: DataType<LessonType>) => {
  return (
    <Space direction="vertical" size="large">
      <Typography.Title level={3}>{data.title}</Typography.Title>

      <Typography.Text>{data.description}</Typography.Text>

      <Typography.Text>{data.layout}</Typography.Text>
    </Space>
  );
};
