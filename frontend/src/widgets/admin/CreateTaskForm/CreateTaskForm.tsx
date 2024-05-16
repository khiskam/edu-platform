import { Spin } from "antd";

import { TaskForm } from "@/features";

import { useFormSubmit } from "./utils";

export const CreateTaskForm = () => {
  const { isLoading, onSubmit } = useFormSubmit();

  return (
    <Spin spinning={isLoading}>
      <TaskForm
        onSubmit={onSubmit}
        defaultValues={{
          answers: [
            { isCorrect: false, value: "" },
            { isCorrect: false, value: "" },
          ],
        }}
      />
    </Spin>
  );
};
