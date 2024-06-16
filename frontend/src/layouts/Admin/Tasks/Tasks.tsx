import Empty from "antd/es/empty";
import Table from "antd/es/table";
import { useState } from "react";

import { DeleteModal, Search } from "@/components";
import { TableProps } from "@/layouts/types";
import { usePageParam } from "@/shared/hooks";
import { Task } from "@/shared/types";

import { useColumns } from "./hooks";

export const Tasks = ({ data, onDelete, pagesCount, isLoading }: TableProps<Task>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const { config } = usePageParam<Task>(data, pagesCount);

  const onOk = () => {
    setDeleteId(undefined);
    onDelete(deleteId);
  };

  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });

  return (
    <>
      <Search />
      <Table
        locale={{ emptyText: <Empty description="Здесь пока нет занятий..." /> }}
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
        title="Удаление задания"
        body="Вы уверены, что хотите удалить задание?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
