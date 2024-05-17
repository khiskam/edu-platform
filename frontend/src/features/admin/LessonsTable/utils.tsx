import { TableProps } from "antd";
import { useMemo } from "react";

import { Lesson, ROUTES, TableButtons } from "@/shared";

import { useColumnsProps } from "./types";

const getEditRoute = (id: string) => {
  return `${ROUTES.admin.path}${ROUTES.categories.path}/${id}/edit`;
};

const getPageRoute = (id: string) => {
  return `${ROUTES.admin.path}${ROUTES.lessons.path}/${id}/edit`;
};

export const useColumns = ({ onDelete }: useColumnsProps) => {
  const columns: TableProps["columns"] = useMemo(
    () => [
      { title: "Наименование", dataIndex: "title" },
      { title: "Описание", dataIndex: "description" },
      {
        title: "Действия",
        dataIndex: "action",
        render: (_, record: Lesson) => (
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
