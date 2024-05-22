import { Spin } from "antd";
import { useParams } from "react-router-dom";

import { Admin } from "@/features";

import { useFormSubmit } from "./hooks";

const { LessonForm } = Admin;

export const CreateLessonForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();
  const { categoryId } = useParams();

  return (
    <Spin spinning={isLoading}>
      <LessonForm onSubmit={onSubmit} defaultValues={{ categoryId }} />
    </Spin>
  );
};
