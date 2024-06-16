import Spin from "antd/es/spin";
import { useRef } from "react";
import { Navigate } from "react-router-dom";

import { User } from "@/layouts";
import { LessonApi } from "@/shared/api";
import { LessonProgress } from "@/shared/api/lesson/types";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { useIntersectionObserver, useSubmit } from "./hooks";

export const Lesson = ({ id }: Id) => {
  const { isLoading, isError, data } = LessonApi.useGetOneProgressQuery(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <LessonWithData data={data.lesson} />;
};

const LessonWithData = ({ data }: { data: LessonProgress }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onSubmit = useSubmit(data.isCompleted);
  useIntersectionObserver(ref, onSubmit?.(data.id));

  return <User.Lesson data={data} ref={ref} />;
};
