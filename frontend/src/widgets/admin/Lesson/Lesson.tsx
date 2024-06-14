import Spin from "antd/es/spin";
import { Navigate } from "react-router-dom";

import { Admin } from "@/features";
import { LessonApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

const { Lesson: LessonLayout } = Admin;

export const Lesson = ({ id }: Id) => {
  const { isLoading, isError, data } = LessonApi.useGetOneQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <LessonLayout data={data.lesson} />;
};
