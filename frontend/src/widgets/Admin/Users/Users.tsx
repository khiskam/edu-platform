import { useSearchParams } from "react-router-dom";

import { Admin } from "@/layouts";
import { UserApi } from "@/shared/api";

export const Users = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = UserApi.useGetAllProgressQuery({
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });

  return <Admin.Users data={data?.users} totalCount={data?.totalCount} isLoading={isLoading} />;
};
