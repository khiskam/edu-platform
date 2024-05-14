import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Form, Spin, Typography } from "antd";
import { useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";

import { CheckboxField, Container, TextField } from "@/components";
import { GAP } from "@/shared/constants";

import { FormData, schema } from "./schema";
import { PageLayout } from "./styled";

export const CreateTaskPage = () => {
  const init = () => {
    console.log("here");
    return 1;
  };
  const [a, setA] = useState(() => init());

  console.log(a);

  const { control, handleSubmit, trigger } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      answers: [
        { isCorrect: false, value: "" },
        { isCorrect: false, value: "" },
      ],
    },
  });

  const onSubmit = handleSubmit(async (data) => console.log(data));
  const handleChange = () => trigger("answers");

  return (
    <Container>
      <PageLayout>
        <Spin spinning={false}>
          <Typography.Title level={2}>Добавить задание</Typography.Title>

          <Form layout="vertical" onFinish={onSubmit}>
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

            <DynamicFields control={control} onChange={handleChange} />

            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>

            <button onClick={() => setA((prev) => prev + 1)}>click</button>
          </Form>
        </Spin>
      </PageLayout>
    </Container>
  );
};

type DynamicFieldsProps = {
  control: Control<FormData>;
  onChange: () => void;
};

const DynamicFields = ({ control, onChange }: DynamicFieldsProps) => {
  const { fields, append, remove } = useFieldArray({ control: control, name: "answers" });

  const addField = () => append({ isCorrect: false, value: "" });

  return fields.map((field, index) => (
    <>
      <Form.Item label={`Ответ ${index + 1}`} key={field.id} style={{ margin: 0 }}>
        <Flex align="start" gap={GAP[12]}>
          <CheckboxField
            control={{ control, name: `answers.${index}.isCorrect` }}
            onChange={onChange}
          />

          <TextField
            control={{ control, name: `answers.${index}.value` }}
            placeholder={`Ответ ${index + 1}`}
            type="input"
          />
          {index > 1 && (
            <Button type="text" icon={<MinusCircleOutlined />} onClick={() => remove(index)} />
          )}
        </Flex>
      </Form.Item>

      <Button onClick={addField} disabled={fields.length === 6} icon={<PlusCircleOutlined />}>
        Добавить ответ
      </Button>
    </>
  ));
};
