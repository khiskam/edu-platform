import { Spin } from "antd";
import { useSearchParams } from "react-router-dom";

import { CategoriesTable as CategoriesTableLayout } from "@/features";
import { CategoryApi } from "@/shared/api";

export const CategoriesTable = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = CategoryApi.useGetAllQuery(searchParams.get("page") ?? "1");
  const { mutateAsync, isPending } = CategoryApi.useDeleteMutation();

  const onDelete = (id: string | undefined) => {
    if (id) mutateAsync(id);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isPending}>
      <CategoriesTableLayout
        data={data?.categories}
        onDelete={onDelete}
        pagesCount={data?.totalCount ?? 1}
      />
    </Spin>
  );
};
