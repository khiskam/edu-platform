import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { SelectField, TextField } from "@/components";
import { categoriesToOptions } from "@/shared/utils/categoriesToOptions";
import { TaskData, taskSchema } from "@/shared/validation";

import { CreateAnswerFields } from "./CreateAnswerFields";
import { TaskFormProps } from "./types";

export const TaskForm = ({ defaultValues, onSubmit, categories }: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TaskData>({
    mode: "onChange",
    resolver: yupResolver(taskSchema),
    defaultValues,
  });

  const onFinish = handleSubmit(onSubmit(setError));

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <TextField
        control={{ control, name: "title" }}
        label="Наименование"
        placeholder="Наименование"
        type="input"
      />

      <TextField
        control={{ control, name: "description" }}
        label="Задание"
        placeholder="Задание"
        type="textarea"
      />

      <SelectField
        control={{ control, name: "category_id" }}
        label="Категории"
        options={categoriesToOptions(categories)}
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
