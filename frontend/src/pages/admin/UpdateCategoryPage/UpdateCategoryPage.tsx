import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";

import { Container, TextField } from "@/components";

import { FormData, schema } from "./schema";
import { PageLayout } from "./styled";

export const UpdateCategoryPage = () => {
  const { control } = useForm<FormData>({
    mode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <PageLayout>
        <Spin spinning={false}>
          <Typography.Title level={2}>Редактировать категорию</Typography.Title>

          <Form layout="vertical">
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
        </Spin>
      </PageLayout>
    </Container>
  );
};
