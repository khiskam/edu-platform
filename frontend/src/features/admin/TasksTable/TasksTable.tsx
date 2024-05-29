import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { DeleteModal } from "@/components";
import { getCurrentPage, usePageParam } from "@/shared/hooks";
import { Task } from "@/shared/types";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const TasksTable = ({ data, onDelete, pagesCount }: TableProps<Task>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const { searchParams, onChange } = usePageParam<Task>(data);

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
        title="Удаление задания"
        body="Вы уверены, что хотите удалить задание?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
