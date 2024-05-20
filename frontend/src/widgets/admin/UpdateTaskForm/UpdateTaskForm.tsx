import { Spin } from "antd";

import { TaskForm } from "@/features";
import { TaskApi } from "@/shared/api";

import { useFormSubmit } from "./utils";

export const UpdateTaskForm = () => {
  const { isLoading, onSubmit } = useFormSubmit("1");
  const { data, isLoading: isDataLoading } = TaskApi.useGetOneQuery("1");

  if (isLoading || isDataLoading) {
    return <Spin />;
  }

  return <TaskForm onSubmit={onSubmit} defaultValues={data} />;
};
