import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { FormProps } from "@/features/types";
import { TaskData } from "@/shared/types";
import { Fields } from "@/shared/ui";
import { taskSchema } from "@/shared/validation";

import { CreateAnswerFields } from "./CreateAnswerFields";

export const TaskForm = ({ defaultValues, onSubmit }: FormProps<TaskData>) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<TaskData>({
    mode: "onChange",
    resolver: yupResolver(taskSchema),
    defaultValues,
  });

  const onFinish = handleSubmit(onSubmit(setError, reset));

  return (
    <Form layout="vertical" onFinish={onFinish}>
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

      <CreateAnswerFields
        control={control}
        name="answers"
        initValue={{ isCorrect: false, value: "" }}
        checkboxName={(idx) => `answers.${idx}.isCorrect`}
        textName={(idx) => `answers.${idx}.value`}
        label="Ответ"
        placeholder="Ответ"
        rootError={errors.answers?.root?.message}
      />

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
