import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormProps } from "@/features/types";
import { LessonData } from "@/shared/types";
import { Fields } from "@/shared/ui";
import { lessonSchema } from "@/shared/validation";

export const LessonForm = ({ defaultValues, onSubmit }: FormProps<LessonData>) => {
  const { control, handleSubmit, setError, reset } = useForm<LessonData>({
    mode: "onChange",
    resolver: yupResolver(lessonSchema),
    defaultValues,
  });
  const [resetValue, setResetValue] = useState<string>();

  const onFinish = handleSubmit(
    onSubmit(setError, (data) => {
      reset(data);
      setResetValue(data?.layout);
    })
  );

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
        label="Описание"
        placeholder="Описание"
        type="textarea"
      />

      <Fields.TextEditor
        control={{ control, name: "layout" }}
        label="Разметка"
        initValue={defaultValues?.layout}
        resetValue={resetValue}
        onReset={() => setResetValue(undefined)}
      />

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
