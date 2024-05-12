import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Space, Table, Typography } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Container, DeleteModal } from "@/components";
import { ROUTES } from "@/shared/constants";

import { content, PageLayout } from "./styled";

export type DataType = {
  id: string;
  name: string;
  description: string;
};

export const tasks: DataType[] = [
  {
    id: "1",
    name: "буква а",
    description: "Введите букву а",
  },
  { id: "2", name: "цифра 1", description: "Введите цифру 1" },
];

export const TasksPage = () => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  return (
    <Container>
      <PageLayout>
        <Flex wrap="wrap" justify="space-between">
          <Typography.Title level={2}>Задания</Typography.Title>
          <NavLink to={`${ROUTES.admin}${ROUTES.tasks}/create`}>
            <Button type="default" icon={<PlusOutlined />}>
              Добавить
            </Button>
          </NavLink>
        </Flex>

        <Space size="middle" direction="vertical" className={content}>
          <ConfigProvider renderEmpty={() => "Здесь пока нет категорий..."}>
            <Table
              dataSource={tasks}
              rowKey="id"
              scroll={{ x: true }}
              bordered
              pagination={{ hideOnSinglePage: true }}
            >
              <Table.Column dataIndex="name" title="Наименование" />
              <Table.Column dataIndex="description" title="Описание" />
              <Table.Column
                title="Действия"
                render={(_, record: DataType) => (
                  <Space size="small">
                    <NavLink to={`${ROUTES.tasks}/${record.id}`}>
                      <Button icon={<EyeOutlined />} />
                    </NavLink>
                    <NavLink
                      to={`${ROUTES.admin}${ROUTES.tasks}/${record.id}/edit`}
                    >
                      <Button icon={<EditOutlined />} />
                    </NavLink>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => setDeleteId(record.id)}
                    />
                  </Space>
                )}
              />
            </Table>
          </ConfigProvider>
        </Space>

        <DeleteModal
          open={!!deleteId}
          title="Удаление задания"
          body="Вы уверены, что хотите удалить задание?"
          onOk={() => setDeleteId(undefined)}
          onCancel={() => setDeleteId(undefined)}
        />
      </PageLayout>
    </Container>
  );
};
