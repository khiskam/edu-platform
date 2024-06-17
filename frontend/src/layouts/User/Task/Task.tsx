import { yupResolver } from "@hookform/resolvers/yup";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import Tag from "antd/es/tag";
import Typography from "antd/es/typography";
import { useForm } from "react-hook-form";

import { Description, Fields } from "@/components";
import { GAP } from "@/shared/theme";
import { AnswerData } from "@/shared/types";
import { answersSchema } from "@/shared/validation";

import { TaskProps } from "./types";

export const Task = ({ data, onSubmit }: TaskProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnswerData>({
    mode: "onChange",
    resolver: yupResolver(answersSchema),
    defaultValues: { answers: data.answers.map((item) => ({ isCorrect: false, value: item })) },
  });

  const onFinish = handleSubmit(onSubmit(data.id, reset));

  return (
    <Flex vertical gap={GAP[24]}>
      <Description
        layout="vertical"
        label="Название"
        value={<Typography.Text>{data.title}</Typography.Text>}
      />

      <Description
        layout="vertical"
        label="Описание"
        value={<Typography.Text>{data.description}</Typography.Text>}
      />

      <Flex vertical gap={GAP[4]} align="start">
        {data.isCompleted ? (
          <>
            <Typography.Text type="secondary">Выполнение</Typography.Text>
            <Tag color="blue">Выполнено</Tag>
          </>
        ) : (
          <>
            <Typography.Text type="secondary">Варианты ответов</Typography.Text>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                validateStatus={errors.answers ? "error" : "validating"}
                help={errors.answers?.root?.message}
              >
                <Flex vertical>
                  {data.answers.map((item, idx) => (
                    <Fields.Checkbox
                      key={idx}
                      control={{ control, name: `answers.${idx}.isCorrect` }}
                      label={item}
                    />
                  ))}
                </Flex>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Ответить
              </Button>
            </Form>
          </>
        )}
      </Flex>
    </Flex>
  );
};
