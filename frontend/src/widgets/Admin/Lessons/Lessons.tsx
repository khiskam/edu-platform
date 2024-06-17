import { useSearchParams } from "react-router-dom";

import { Admin } from "@/layouts";
import { LessonApi } from "@/shared/api";
import { Id } from "@/shared/types";

export const Lessons = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data, isRefetching } = LessonApi.useGetAllQuery(id, {
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });
  const { mutateAsync, isPending } = LessonApi.useDeleteMutation();

  const onDelete = (id: string | undefined) => {
    if (id) mutateAsync(id);
  };

  return (
    <Admin.Lessons
      data={data?.lessons}
      onDelete={onDelete}
      pagesCount={data?.totalCount ?? 1}
      isLoading={isPending || isLoading || isRefetching}
    />
  );
};
