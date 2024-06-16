import { TableProps } from "antd/es/table";
import { useMemo } from "react";

import { TableButtons } from "@/components";
import { useColumnsProps } from "@/layouts/types";
import { Category } from "@/shared/types";

export const useColumns = ({ onDelete }: useColumnsProps) => {
  const columns: TableProps["columns"] = useMemo(
    () => [
      { title: "Наименование", dataIndex: "name" },
      { title: "Описание", dataIndex: "description" },
      {
        title: "Действия",
        dataIndex: "action",
        render: (_, record: Category) => (
          <TableButtons
            onDelete={() => onDelete(record.id)}
            editTo={`${record.id}/edit`}
            pageTo={record.id}
          />
        ),
      },
    ],
    [onDelete]
  );

  return columns;
};
