import Spin from "antd/es/spin";
import { useParams } from "react-router-dom";

import { Admin } from "@/layouts";

import { useFormSubmit } from "./hooks";

export const CreateLesson = () => {
  const { isLoading, onSubmit } = useFormSubmit();
  const { categoryId } = useParams();

  return (
    <Spin spinning={isLoading}>
      <Admin.LessonForm onSubmit={onSubmit} defaultValues={{ categoryId }} />
    </Spin>
  );
};
