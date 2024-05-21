import { Spin } from "antd";
import { useParams } from "react-router-dom";

import { LessonForm } from "@/features";

import { useFormSubmit } from "./hooks";

export const CreateLessonForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();
  const { categoryId } = useParams();

  return (
    <Spin spinning={isLoading}>
      <LessonForm onSubmit={onSubmit} defaultValues={{ categoryId }} />
    </Spin>
  );
};
