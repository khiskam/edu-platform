import ConfigProvider from "antd/es/config-provider";
import Table from "antd/es/table";
import { useState } from "react";

import { DeleteModal } from "@/components";
import { usePageParam } from "@/shared/hooks";
import { Task } from "@/shared/types";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const TasksTable = ({ data, onDelete, pagesCount }: TableProps<Task>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const { config } = usePageParam<Task>(data, pagesCount);

  const onOk = () => {
    setDeleteId(undefined);
    onDelete(deleteId);
  };

  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });

  return (
    <>
      <ConfigProvider renderEmpty={() => "Здесь пока нет заданий..."}>
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
        title="Удаление задания"
        body="Вы уверены, что хотите удалить задание?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
