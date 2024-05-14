import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Space, Table, Typography } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Container, DeleteModal } from "@/components";
import { ROUTES } from "@/shared/constants";

import { content, PageLayout } from "./styled";

export type DataType = {
  id: string;
  name: string;
};

export const categories: DataType[] = [
  {
    id: "1",
    name: "русский языкрусскийязыкрусскийязык русский язык",
  },
  { id: "2", name: "математика" },
];

export const CategoriesPage = () => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  return (
    <Container>
      <PageLayout>
        <Flex wrap="wrap" justify="space-between">
          <Typography.Title level={2}>Категории</Typography.Title>
          <NavLink to={`${ROUTES.admin}${ROUTES.categories}/create`}>
            <Button type="default" icon={<PlusOutlined />}>
              Добавить
            </Button>
          </NavLink>
        </Flex>

        <Space size="middle" direction="vertical" className={content}>
          <ConfigProvider renderEmpty={() => "Здесь пока нет категорий..."}>
            <Table
              dataSource={categories}
              rowKey="id"
              scroll={{ x: true }}
              bordered
              pagination={{ hideOnSinglePage: true }}
            >
              <Table.Column dataIndex="name" title="Наименование" />
              <Table.Column
                title="Действия"
                render={(_, record: DataType) => (
                  <Space size="small">
                    <NavLink to={`${ROUTES.admin}${ROUTES.categories}/${record.id}/edit`}>
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
          title="Удаление категории"
          body="Вы уверены, что хотите удалить категорию?"
          onOk={() => setDeleteId(undefined)}
          onCancel={() => setDeleteId(undefined)}
        />
      </PageLayout>
    </Container>
  );
};
