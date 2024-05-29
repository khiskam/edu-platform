import { TableProps } from "antd";
import { useMemo } from "react";

import { TableButtons } from "@/components";
import { ROUTES } from "@/shared/routes";
import { Category } from "@/shared/types";

import { useColumnsProps } from "./types";

const getEditRoute = (id: string) => {
  return `${ROUTES.admin.path}${ROUTES.categories.path}/${id}/edit`;
};

const getPageRoute = (id: string) => {
  return `${ROUTES.admin.path}${ROUTES.categories.path}/${id}`;
};

export const useColumns = ({ onDelete }: useColumnsProps) => {
  const columns: TableProps["columns"] = useMemo(
    () => [
      { title: "Наименование", dataIndex: "name" },
      {
        title: "Действия",
        dataIndex: "action",
        render: (_, record: Category) => (
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
