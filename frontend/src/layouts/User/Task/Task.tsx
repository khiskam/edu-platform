import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Flex, Form, Tag, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";

import { Description } from "@/components";
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
    defaultValues: { answers: [] },
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
                help={errors.answers?.message}
              >
                <Controller
                  control={control}
                  name="answers"
                  render={({ field }) => (
                    <Checkbox.Group onChange={field.onChange} value={field.value}>
                      <Flex vertical gap={GAP[4]}>
                        {data.answers.map((value, idx) => (
                          <Checkbox value={value} key={idx}>
                            {value}
                          </Checkbox>
                        ))}
                      </Flex>
                    </Checkbox.Group>
                  )}
                />
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
