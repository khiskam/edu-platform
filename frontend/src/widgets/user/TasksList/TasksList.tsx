import { Spin } from "antd";

import { TasksList as TasksListLayout } from "@/features";
import { TaskApi } from "@/shared/api";

export const TasksList = () => {
  const { isLoading, data } = TaskApi.useGetAllQuery();

  if (isLoading) {
    return <Spin />;
  }

  return <TasksListLayout data={data?.tasks} />;
};
