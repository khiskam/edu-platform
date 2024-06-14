import Spin from "antd/es/spin";
import { useSearchParams } from "react-router-dom";

import { User } from "@/features";
import { CategoryApi } from "@/shared/api";

const { CategoriesList: CategoriesListLayout } = User;

export const CategoriesList = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = CategoryApi.useGetAllWithProgressQuery(
    searchParams.get("page") ?? "1"
  );

  return (
    <Spin spinning={isLoading}>
      <CategoriesListLayout data={data?.categories} totalCount={data?.totalCount} />
    </Spin>
  );
};
