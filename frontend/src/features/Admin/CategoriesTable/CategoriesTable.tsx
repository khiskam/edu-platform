import ConfigProvider from "antd/es/config-provider";
import Table from "antd/es/table";
import { useState } from "react";

import { DeleteModal } from "@/components";
import { usePageParam } from "@/shared/hooks";
import { Category } from "@/shared/types";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const CategoriesTable = ({ data, onDelete, pagesCount }: TableProps<Category>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const { config } = usePageParam<Category>(data, pagesCount);

  const onOk = () => {
    setDeleteId(undefined);
    onDelete(deleteId);
  };

  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });

  return (
    <>
      <ConfigProvider renderEmpty={() => "Здесь пока нет категорий..."}>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
          bordered
          pagination={config}
        />
      </ConfigProvider>

      <DeleteModal
        open={!!deleteId}
        title="Удаление категории"
        body="Вы уверены, что хотите удалить категорию?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
