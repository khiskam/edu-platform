import { Spin } from "antd";

import { TasksTable as TasksTableLayout } from "@/features";
import { TaskApi } from "@/shared";

export const TasksTable = () => {
  const { isLoading, data } = TaskApi.useGetAllQuery();

  if (isLoading) {
    return <Spin />;
  }

  return <TasksTableLayout data={data} />;
};
