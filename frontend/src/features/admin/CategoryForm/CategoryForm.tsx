import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { TextField } from "@/components";
import { FormProps } from "@/shared/types";
import { CategoryData, categorySchema } from "@/shared/validation";

export const CategoryForm = ({ defaultValues, onSubmit }: FormProps<CategoryData>) => {
  const { control, handleSubmit, setError } = useForm<CategoryData>({
    mode: "onChange",
    resolver: yupResolver(categorySchema),
    defaultValues,
  });

  const onFinish = handleSubmit(onSubmit(setError));

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <TextField
        control={{ control, name: "name" }}
        label="Наименование"
        placeholder="Наименование"
        type="input"
      />

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
