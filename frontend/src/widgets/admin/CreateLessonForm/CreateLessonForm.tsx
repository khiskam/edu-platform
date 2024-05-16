import { Spin } from "antd";

import { LessonForm } from "@/features";

import { useFormSubmit } from "./utils";

export const CreateLessonForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <LessonForm onSubmit={onSubmit} />
    </Spin>
  );
};
