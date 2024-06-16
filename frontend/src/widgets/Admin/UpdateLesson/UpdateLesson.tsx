import Spin from "antd/es/spin";

import { Admin } from "@/layouts";
import { LessonApi } from "@/shared/api";
import { Id } from "@/shared/types";

import { useFormSubmit } from "./hooks";

export const UpdateLesson = ({ id }: Id) => {
  const { isLoading, onSubmit } = useFormSubmit(id);
  const { data, isLoading: isDataLoading, isRefetching } = LessonApi.useGetOneQuery(id);

  if (isDataLoading) {
    return <Spin />;
  }

  return (
    <Spin spinning={isRefetching || isLoading}>
      <Admin.LessonForm onSubmit={onSubmit} defaultValues={data?.lesson} />
    </Spin>
  );
};
