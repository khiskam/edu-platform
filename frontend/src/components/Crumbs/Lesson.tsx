import { Navigate, useParams } from "react-router-dom";

import { LessonApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { Skeleton } from "./Skeleton";

export const Lesson = () => {
  const { lessonId } = useParams();

  console.log(lessonId);

  if (!lessonId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <LessonCrumb id={lessonId} />;
};

export const LessonCrumb = ({ id }: Id) => {
  const { isLoading, data } = LessonApi.useGetOneQuery(id);

  if (isLoading) {
    return <Skeleton />;
  }

  return <>{data?.lesson.title}</>;
};