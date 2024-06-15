import Spin from "antd/es/spin";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

import { Admin } from "@/features";
import { CategoryApi, LessonApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

const { LessonsTable: LessonsTableLayout } = Admin;

export const LessonsTable = () => {
  const { categoryId } = useParams();

  if (!categoryId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <LessonTableByCategoryId id={categoryId} />;
};

export const LessonTableByCategoryId = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = CategoryApi.useGetAllLessonsQuery(
    id,
    searchParams.get("page") ?? "1"
  );
  const { mutateAsync, isPending } = LessonApi.useDeleteMutation();

  const onDelete = (id: string | undefined) => {
    if (id) mutateAsync(id);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isPending}>
      <LessonsTableLayout
        data={data?.lessons}
        onDelete={onDelete}
        pagesCount={data?.totalCount ?? 1}
      />
    </Spin>
  );
};
