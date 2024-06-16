import { useSearchParams } from "react-router-dom";

import { Admin } from "@/layouts";
import { TaskApi } from "@/shared/api";
import { Id } from "@/shared/types";

export const Tasks = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data, isRefetching } = TaskApi.useGetAllQuery(id, {
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });
  const { mutateAsync, isPending } = TaskApi.useDeleteMutation();

  const onDelete = (id: string | undefined) => {
    if (id) mutateAsync(id);
  };

  return (
    <Admin.Tasks
      data={data?.tasks}
      onDelete={onDelete}
      pagesCount={data?.totalCount ?? 1}
      isLoading={isPending || isRefetching || isLoading}
    />
  );
};
