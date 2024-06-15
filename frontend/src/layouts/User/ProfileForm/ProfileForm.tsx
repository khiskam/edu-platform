import { yupResolver } from "@hookform/resolvers/yup";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import Typography from "antd/es/typography";
import { useForm } from "react-hook-form";

import { Fields } from "@/components";
import { FormProps } from "@/layouts/types";
import { GAP } from "@/shared/theme";
import { UpdateUserData } from "@/shared/types";
import { updateSchema } from "@/shared/validation";

import { FormLayout } from "./styled";

export const ProfileForm = ({ defaultValues, onSubmit }: FormProps<UpdateUserData>) => {
  const { control, handleSubmit, setError } = useForm<UpdateUserData>({
    resolver: yupResolver(updateSchema),
    defaultValues: defaultValues,
  });

  const onFinish = handleSubmit(onSubmit(setError));

  return (
    <Flex gap={GAP[24]} vertical>
      <Typography.Title level={3}>Редактировать профиль</Typography.Title>
      <Form layout="vertical" onFinish={onFinish}>
        <FormLayout>
          <Fields.Text
            control={{ control, name: "firstName" }}
            type="input"
            label="Имя"
            placeholder="Имя"
          />

          <Fields.Text
            control={{ control, name: "lastName" }}
            type="input"
            label="Фамилия"
            placeholder="Фамилия"
          />
        </FormLayout>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form>
    </Flex>
  );
};
