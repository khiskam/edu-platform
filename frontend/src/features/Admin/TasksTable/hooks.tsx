import { TableProps } from "antd/es/table";
import { useMemo } from "react";

import { TableButtons } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Task } from "@/shared/types";

import { useColumnsProps } from "./types";

export const useColumns = ({ onDelete }: useColumnsProps) => {
  const columns: TableProps["columns"] = useMemo(
    () => [
      { title: "Наименование", dataIndex: "title" },
      { title: "Описание", dataIndex: "description" },
      {
        title: "Действия",
        dataIndex: "action",
        render: (_, record: Task) => (
          <TableButtons
            onDelete={() => onDelete(record.id)}
            editTo={`${record.id}/${ROUTES.edit.name}`}
            pageTo={record.id}
          />
        ),
      },
    ],
    [onDelete]
  );

  return columns;
};
