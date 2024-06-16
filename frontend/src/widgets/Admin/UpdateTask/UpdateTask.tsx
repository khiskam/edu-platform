import Spin from "antd/es/spin";

import { Admin } from "@/layouts";
import { TaskApi } from "@/shared/api";
import { getTaskData, Id } from "@/shared/types";

import { useFormSubmit } from "./hooks";

export const UpdateTask = ({ id }: Id) => {
  const { isLoading, onSubmit } = useFormSubmit(id);
  const { data, isLoading: isDataLoading, isRefetching } = TaskApi.useGetOneQuery(id);

  if (isDataLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isRefetching || isLoading}>
      <Admin.TaskForm onSubmit={onSubmit} defaultValues={getTaskData(data?.task)} />
    </Spin>
  );
};
