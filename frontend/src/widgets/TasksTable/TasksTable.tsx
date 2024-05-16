import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { DeleteModal } from "@/components";

import { useColumns } from "./utils";

export const TasksTable = () => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });

  return (
    <>
      <ConfigProvider renderEmpty={() => "Здесь пока нет заданий..."}>
        <Table
          dataSource={[]}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
          bordered
          pagination={{ hideOnSinglePage: true }}
        />
      </ConfigProvider>

      <DeleteModal
        open={!!deleteId}
        title="Удаление задания"
        body="Вы уверены, что хотите удалить задание?"
        onOk={() => setDeleteId(undefined)}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
