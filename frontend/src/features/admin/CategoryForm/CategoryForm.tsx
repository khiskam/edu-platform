import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { useForm } from "react-hook-form";

import { Fields } from "@/components";
import { FormProps } from "@/features/types";
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

      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
