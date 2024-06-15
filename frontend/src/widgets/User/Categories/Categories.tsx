import { useSearchParams } from "react-router-dom";

import { User } from "@/layouts";
import { CategoryApi } from "@/shared/api";

export const Categories = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = CategoryApi.useGetAllProgressQuery({
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });

  return (
    <User.Categories data={data?.categories} totalCount={data?.totalCount} isLoading={isLoading} />
  );
};
