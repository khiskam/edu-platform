import { yupResolver } from "@hookform/resolvers/yup";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { useForm } from "react-hook-form";

import { Fields } from "@/components";
import { FormProps } from "@/layouts/types";
import { TaskDataWithAnswers } from "@/shared/types/task";
import { taskSchema } from "@/shared/validation";

import { AnswerFields } from "./AnswerFields";

export const TaskForm = ({ defaultValues, onSubmit }: FormProps<TaskDataWithAnswers>) => {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<TaskDataWithAnswers>({
    resolver: yupResolver(taskSchema),
    defaultValues,
  });

  const onFinish = handleSubmit(onSubmit(setError, reset));

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={{ answers: defaultValues?.answers }}>
      <Fields.Text
        control={{ control, name: "title" }}
        label="Наименование"
        placeholder="Наименование"
        type="input"
      />

      <Fields.Text
        control={{ control, name: "description" }}
        label="Задание"
        placeholder="Задание"
        type="textarea"
      />

      <AnswerFields
        control={control}
        name="answers"
        initValue={{ isCorrect: false, value: "" }}
        checkboxName={(idx) => `answers.${idx}.isCorrect`}
        textName={(idx) => `answers.${idx}.value`}
        label="Ответ"
        placeholder="Ответ"
        rootError={errors.answers?.root?.message ?? errors.answers?.message}
      />

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
