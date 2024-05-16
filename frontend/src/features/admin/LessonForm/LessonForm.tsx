import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { SelectField, TextEditorField, TextField } from "@/components";
import { categoriesToOptions } from "@/shared/utils/categoriesToOptions";
import { LessonData, lessonSchema } from "@/shared/validation";

import { LessonFormProps } from "./types";

export const LessonForm = ({ onSubmit, defaultValues, categories }: LessonFormProps) => {
  const { control, handleSubmit, setError } = useForm<LessonData>({
    mode: "onChange",
    resolver: yupResolver(lessonSchema),
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
        label="Описание"
        placeholder="Описание"
        type="textarea"
      />

      <SelectField
        control={{ control, name: "category_id" }}
        label="Категории"
        options={categoriesToOptions(categories)}
      />

      <TextEditorField
        control={{ control, name: "layout" }}
        label="Разметка"
        initValue={defaultValues?.layout}
      />

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
