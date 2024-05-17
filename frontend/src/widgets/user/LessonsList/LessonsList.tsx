import { Spin } from "antd";

import { LessonsList as LessonsListLayout } from "@/features";
import { LessonApi } from "@/shared";

export const LessonsList = () => {
  const { isLoading, data } = LessonApi.useGetAllQuery();

  if (isLoading) {
    return <Spin />;
  }

  return <LessonsListLayout data={data} />;
};
