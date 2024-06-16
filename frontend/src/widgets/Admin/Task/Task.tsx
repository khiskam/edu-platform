import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { Admin } from "@/layouts";
import { TaskApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { getTaskData, Id } from "@/shared/types";

export const Task = ({ id }: Id) => {
  const { isLoading, isError, data } = TaskApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  const task = getTaskData(data.task);

  if (!task) {
    return <Spin />;
  }

  return <Admin.Task data={task} />;
};
