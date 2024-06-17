import { Navigate, useParams } from "react-router-dom";

import { TaskApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { Skeleton } from "./Skeleton";

export const Task = () => {
  const { taskId } = useParams();

  console.log(taskId);

  if (!taskId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <TaskCrumb id={taskId} />;
};

export const TaskCrumb = ({ id }: Id) => {
  const { isLoading, data, isError } = TaskApi.useOneProgressQuery(id);

  if (isLoading) {
    return <Skeleton />;
  } else if (isError) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  } else {
    return <>{data?.task.title}</>;
  }
};
