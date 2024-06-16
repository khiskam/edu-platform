import { yupResolver } from "@hookform/resolvers/yup";
import Button from "antd/es/button";
import Form from "antd/es/form";
import { useForm } from "react-hook-form";

import { Fields } from "@/components";
import { FormProps } from "@/layouts/types";
import { CategoryData } from "@/shared/types";
import { categorySchema } from "@/shared/validation";

export const CategoryForm = ({ defaultValues, onSubmit }: FormProps<CategoryData>) => {
  const { control, handleSubmit, setError, reset } = useForm<CategoryData>({
    mode: "onChange",
    resolver: yupResolver(categorySchema),
    defaultValues,
  });

  const onFinish = handleSubmit(onSubmit(setError, reset));

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Fields.Text
        control={{ control, name: "name" }}
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

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
