import { Spin } from "antd";
import { useSearchParams } from "react-router-dom";

import { User } from "@/features";
import { CategoryApi } from "@/shared/api";
import { Id } from "@/shared/types";

const { LessonsList: LessonsListLayout } = User;

export const LessonsList = ({ id }: Id) => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = CategoryApi.useGetAllLessonsWithProgressQuery(
    id,
    searchParams.get("page") ?? "1"
  );

  return (
    <Spin spinning={isLoading}>
      <LessonsListLayout data={data?.lessons} totalCount={data?.totalCount} />
    </Spin>
  );
};
