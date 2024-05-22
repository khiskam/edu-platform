import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { getCurrentPage, usePageParam } from "@/shared/hooks";
import { Category } from "@/shared/types";
import { DeleteModal } from "@/shared/ui";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const CategoriesTable = ({ data, onDelete, pagesCount }: TableProps<Category>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const { searchParams, onChange } = usePageParam<Category>(data);

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
          pagination={{
            hideOnSinglePage: true,
            total: pagesCount,
            defaultCurrent: getCurrentPage(searchParams),
            onChange: onChange,
          }}
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
