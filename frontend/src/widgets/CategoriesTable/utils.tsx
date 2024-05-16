import { TableProps } from "antd";
import { useMemo } from "react";

import { TableButtons } from "@/components";
import { ROUTES } from "@/shared/constants";

import { DataType, useColumnsProps } from "./types";

const getEditRoute = (id: string) => {
  return `${ROUTES.admin}${ROUTES.categories}/${id}/edit`;
};

export const useColumns = ({ onDelete }: useColumnsProps) => {
  const columns: TableProps["columns"] = useMemo(
    () => [
      { title: "Наименование", dataIndex: "name" },
      {
        title: "Действия",
        dataIndex: "action",
        render: (_, record: DataType) => (
          <TableButtons onDelete={() => onDelete(record.id)} editTo={getEditRoute(record.id)} />
        ),
      },
    ],
    [onDelete]
  );

  return columns;
};
