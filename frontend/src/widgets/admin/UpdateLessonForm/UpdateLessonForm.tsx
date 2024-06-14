import Spin from "antd/es/spin";
import { Navigate, useParams } from "react-router-dom";

import { Admin } from "@/features";
import { LessonApi } from "@/shared/api";
import { ROUTES } from "@/shared/routes";
import { Id } from "@/shared/types";

import { useFormSubmit } from "./hooks";

const { LessonForm } = Admin;

export const UpdateLessonForm = () => {
  const { lessonId } = useParams();

  if (!lessonId) {
    return <Navigate to={`${ROUTES.admin.path}${ROUTES.categories.path}`} />;
  }

  return <UpdateLessonFormById id={lessonId} />;
};

export const UpdateLessonFormById = ({ id }: Id) => {
  const { isLoading, onSubmit } = useFormSubmit(id);
  const { data, isLoading: isDataLoading, isRefetching } = LessonApi.useGetOneQuery(id);

  if (isDataLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isRefetching || isLoading}>
      <LessonForm onSubmit={onSubmit} defaultValues={data?.lesson} />
    </Spin>
  );
};
