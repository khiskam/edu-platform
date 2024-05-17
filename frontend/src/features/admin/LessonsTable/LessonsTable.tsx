import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { DeleteModal, Lesson } from "@/shared";

import { TableProps } from "../types";
import { useColumns } from "./utils";

export const LessonsTable = ({ data }: TableProps<Lesson>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });

  return (
    <>
      <ConfigProvider renderEmpty={() => "Здесь пока нет занятий..."}>
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
        title="Удаление занятия"
        body="Вы уверены, что хотите удалить занятие?"
        onOk={() => setDeleteId(undefined)}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};