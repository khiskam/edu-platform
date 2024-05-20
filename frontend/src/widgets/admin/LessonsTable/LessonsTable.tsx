import { Spin } from "antd";

import { LessonsTable as LessonsTableLayout } from "@/features";
import { LessonApi } from "@/shared/api";

export const LessonsTable = () => {
  const { isLoading, data } = LessonApi.useGetAllQuery();

  if (isLoading) {
    return <Spin />;
  }

  return <LessonsTableLayout data={data} />;
};
