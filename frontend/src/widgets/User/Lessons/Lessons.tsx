import { useSearchParams } from "react-router-dom";

import { User } from "@/layouts";
import { LessonApi } from "@/shared/api";
import { Id } from "@/shared/types";

export const Lessons = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = LessonApi.useGetAllProgressQuery(id, {
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  });

  return <User.Lessons data={data?.lessons} totalCount={data?.totalCount} isLoading={isLoading} />;
};
