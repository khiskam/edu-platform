import { useSearchParams } from "react-router-dom";

import { User } from "@/layouts";
import { TaskApi } from "@/shared/api";
import { Id } from "@/shared/types";

export const Tasks = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = TaskApi.useGetAllProgressQuery(id, {
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });

  return <User.Tasks data={data?.tasks} totalCount={data?.totalCount} isLoading={isLoading} />;
};
