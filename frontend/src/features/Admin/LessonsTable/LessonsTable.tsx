import ConfigProvider from "antd/es/config-provider";
import Table from "antd/es/table";
import { useState } from "react";

import { DeleteModal } from "@/components";
import { usePageParam } from "@/shared/hooks";
import { Lesson } from "@/shared/types";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const LessonsTable = ({ data, onDelete, pagesCount }: TableProps<Lesson>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });
  const { config } = usePageParam<Lesson>(data, pagesCount);

  const onOk = () => {
    setDeleteId(undefined);
    onDelete(deleteId);
  };

  return (
    <>
      <ConfigProvider renderEmpty={() => "Здесь пока нет занятий..."}>
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
        title="Удаление занятия"
        body="Вы уверены, что хотите удалить занятие?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
