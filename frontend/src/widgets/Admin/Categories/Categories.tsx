import { useSearchParams } from "react-router-dom";

import { Admin } from "@/layouts";
import { CategoryApi } from "@/shared/api";

export const Categories = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data, isRefetching } = CategoryApi.useGetAllQuery({
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });
  const { mutateAsync, isPending } = CategoryApi.useDeleteMutation();

  const onDelete = (id: string | undefined) => {
    if (id) mutateAsync(id);
  };

  return (
    <Admin.Categories
      data={data?.categories}
      onDelete={onDelete}
      pagesCount={data?.totalCount ?? 1}
      isLoading={isLoading || isPending || isRefetching}
    />
  );
};
