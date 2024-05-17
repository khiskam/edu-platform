import { TableProps } from "antd";
import { useMemo } from "react";

import { ROUTES, TableButtons, Task } from "@/shared";

import { useColumnsProps } from "./types";

const getEditRoute = (id: string) => {
  return `${ROUTES.admin.path}${ROUTES.tasks.path}/${id}/edit`;
};

const getPageRoute = (id: string) => {
  return `${ROUTES.admin.path}${ROUTES.tasks.path}/${id}`;
};

export const useColumns = ({ onDelete }: useColumnsProps) => {
  const columns: TableProps["columns"] = useMemo(
    () => [
      { title: "Наименование", dataIndex: "name" },
      { title: "Описание", dataIndex: "description" },
      {
        title: "Действия",
        dataIndex: "action",
        render: (_, record: Task) => (
          <TableButtons
            onDelete={() => onDelete(record.id)}
            editTo={getEditRoute(record.id)}
            pageTo={getPageRoute(record.id)}
          />
        ),
      },
    ],
    [onDelete]
  );

  return columns;
};
