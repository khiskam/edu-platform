import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Spin, Typography } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Container, TextEditorField, TextField } from "@/components";

import { FormData as FD, schema } from "./schema";
import { PageLayout } from "./styled";

export const UpdateLessonPage = () => {
  const { control } = useForm<FD>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(true);

  const onInit = () => setIsLoading(false);

  return (
    <Container>
      <PageLayout>
        <Spin spinning={isLoading}>
          <Typography.Title level={2}>Редактировать занятие</Typography.Title>

          <Form layout="vertical">
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

            <TextEditorField
              control={{ control, name: "layout" }}
              label="Разметка"
              onInit={onInit}
            />

            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form>
        </Spin>
      </PageLayout>
    </Container>
  );
};
