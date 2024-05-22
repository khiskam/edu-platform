import { Spin } from "antd";
import { useSearchParams } from "react-router-dom";

import { User } from "@/features";
import { LessonApi } from "@/shared/api";
import { Id } from "@/shared/types";

const { TasksList: TasksListLayout } = User;

export const TasksList = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = LessonApi.useGetAllTasksWithProgressQuery(
    id,
    searchParams.get("page") ?? "1"
  );

  return (
    <Spin spinning={isLoading}>
      <TasksListLayout data={data?.tasks} totalCount={data?.totalCount} />
    </Spin>
  );
};
