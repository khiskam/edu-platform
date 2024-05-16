import { Spin } from "antd";

import { LessonForm } from "@/features";
import { LessonApi } from "@/shared";

import { useFormSubmit } from "./utils";

export const UpdateLessonForm = () => {
  const { isLoading, onSubmit } = useFormSubmit("1");
  const { data, isLoading: isDataLoading } = LessonApi.useGetOneQuery("1");

  if (isDataLoading || isLoading) {
    return <Spin />;
  }

  return <LessonForm onSubmit={onSubmit} defaultValues={data} />;
};
