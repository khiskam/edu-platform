import Spin from "antd/es/spin";
import { useRef } from "react";
import { Navigate } from "react-router-dom";

import { User } from "@/features";
import { LessonApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { useIntersectionObserver, useSubmit } from "./hooks";
import { LessonWithDataProps } from "./types";

const { Lesson: LessonLayout } = User;

export const Lesson = ({ id }: Id) => {
  const { isLoading, isError, data } = LessonApi.useOneWithProgress(id);

  if (isError) {
    return <Navigate to={ROUTES.categories.path} />;
  }

  if (isLoading || !data) {
    return <Spin />;
  }

  return <LessonWithData data={data.lesson} />;
};

const LessonWithData = ({ data }: LessonWithDataProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const onSubmit = useSubmit(data.isCompleted);
  useIntersectionObserver(ref, onSubmit?.(data.id));

  return <LessonLayout data={data} ref={ref} />;
};
