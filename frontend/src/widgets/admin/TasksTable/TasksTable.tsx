import { Spin } from "antd";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

import { Admin } from "@/features";
import { LessonApi, TaskApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

const { TasksTable: TasksTableLayout } = Admin;

export const TasksTable = () => {
  const { lessonId } = useParams();

  if (!lessonId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <TaskTableByLessonId id={lessonId} />;
};

export const TaskTableByLessonId = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = LessonApi.useGetAllTasksQuery(id, searchParams.get("page") ?? "1");
  const { mutateAsync, isPending } = TaskApi.useDeleteMutation();

  const onDelete = (id: string | undefined) => {
    if (id) mutateAsync(id);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isPending}>
      <TasksTableLayout data={data?.tasks} onDelete={onDelete} pagesCount={data?.totalCount ?? 1} />
    </Spin>
  );
};
