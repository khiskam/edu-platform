import { Spin } from "antd";
import { Navigate, useParams } from "react-router-dom";

import { Admin } from "@/features";
import { getTask, TaskApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { useFormSubmit } from "./hooks";

const { TaskForm } = Admin;

export const UpdateTaskForm = () => {
  const { taskId } = useParams();

  if (!taskId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <UpdateTaskFormByTaskId id={taskId} />;
};

export const UpdateTaskFormByTaskId = ({ id }: Id) => {
  const { isLoading, onSubmit } = useFormSubmit(id);
  const { data, isLoading: isDataLoading, isRefetching } = TaskApi.useGetOneQuery(id);

  if (isDataLoading) {
    return <Spin />;
  }

  const task = getTask(data);

  return (
    <Spin spinning={isRefetching || isLoading}>
      <TaskForm onSubmit={onSubmit} defaultValues={task} />
    </Spin>
  );
};
