import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { getCurrentPage, usePageParam } from "@/shared/hooks";
import { Lesson } from "@/shared/types";
import { DeleteModal } from "@/shared/ui";

import { TableProps } from "../types";
import { useColumns } from "./hooks";

export const LessonsTable = ({ data, onDelete, pagesCount }: TableProps<Lesson>) => {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const columns = useColumns({ onDelete: (id) => setDeleteId(id) });
  const { searchParams, onChange } = usePageParam<Lesson>(data);

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
        title="Удаление занятия"
        body="Вы уверены, что хотите удалить занятие?"
        onOk={onOk}
        onCancel={() => setDeleteId(undefined)}
      />
    </>
  );
};
