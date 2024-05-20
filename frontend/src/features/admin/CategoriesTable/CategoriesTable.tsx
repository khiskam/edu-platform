import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { Category } from "@/shared/types";
import { DeleteModal } from "@/shared/ui";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const CategoriesTable = ({ data }: TableProps<Category>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
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
          pagination={{ hideOnSinglePage: true }}
        />
      </ConfigProvider>

      <DeleteModal
        open={!!deleteId}
        title="Удаление категории"
        body="Вы уверены, что хотите удалить категорию?"
        onOk={() => setDeleteId(undefined)}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
