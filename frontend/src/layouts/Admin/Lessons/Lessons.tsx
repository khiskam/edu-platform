import Empty from "antd/es/empty";
import Table from "antd/es/table";
import { useState } from "react";

import { DeleteModal, Search } from "@/components";
import { TableProps } from "@/layouts/types";
import { usePageParam } from "@/shared/hooks";
import { Lesson } from "@/shared/types";

import { useColumns } from "./hooks";

export const Lessons = ({ data, onDelete, pagesCount, isLoading }: TableProps<Lesson>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });
  const { config } = usePageParam<Lesson>(data, pagesCount);

  const onOk = () => {
    setDeleteId(undefined);
    onDelete(deleteId);
  };

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
        title="Удаление занятия"
        body="Вы уверены, что хотите удалить занятие?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
