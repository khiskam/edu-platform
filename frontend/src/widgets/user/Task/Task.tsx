import { Spin } from "antd";

import { Task as TaskLayout } from "@/features";
import { TaskApi } from "@/shared/api";

export const Task = () => {
  const { isLoading, data } = TaskApi.useGetOneQuery("1");

  if (isLoading) {
    return <Spin />;
  }

  if (!data) {
    return null;
  }

  return <TaskLayout data={data} />;
};
