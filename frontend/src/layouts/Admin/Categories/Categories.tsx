import Empty from "antd/es/empty";
import Table from "antd/es/table";
import { useState } from "react";

import { DeleteModal, Search } from "@/components";
import { TableProps } from "@/layouts/types";
import { usePageParam } from "@/shared/hooks";
import { Category } from "@/shared/types";

import { useColumns } from "./hooks";

export const Categories = ({ data, onDelete, pagesCount, isLoading }: TableProps<Category>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const { config } = usePageParam<Category>(data, pagesCount);

  const onOk = () => {
    setDeleteId(undefined);
    onDelete(deleteId);
  };

  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });

  return (
    <>
      <Search />
      <Table
        locale={{ emptyText: <Empty description="Здесь пока нет категорий..." /> }}
        loading={isLoading}
        dataSource={data}
        columns={columns}
        rowKey="id"
        scroll={{ x: true }}
        bordered
        pagination={config}
      />

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
