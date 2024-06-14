import Spin from "antd/es/spin";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { Admin } from "@/features";

import { useFormSubmit } from "./hooks";

const { TaskForm } = Admin;

export const CreateTaskForm = () => {
  const { lessonId } = useParams();

  const dafaultValues = useMemo(
    () => ({
      lessonId,
      answers: [
        { isCorrect: false, value: "" },
        { isCorrect: false, value: "" },
      ],
    }),
    [lessonId]
  );

  const { isLoading, onSubmit } = useFormSubmit(dafaultValues);

  return (
    <Spin spinning={isLoading}>
      <TaskForm onSubmit={onSubmit} defaultValues={dafaultValues} />
    </Spin>
  );
};
