import { ConfigProvider, Table } from "antd";
import { useState } from "react";

import { Lesson } from "@/shared/types";
import { DeleteModal } from "@/shared/ui";

import { usePageParam } from "../hooks";
import { TableProps } from "../types";
import { getCurrentPage } from "../utils";
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
            defaultCurrent: getCurrentPage(searchParams.get("page")),
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
