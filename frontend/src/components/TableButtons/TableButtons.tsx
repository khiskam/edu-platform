import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { NavLink } from "react-router-dom";

import { TableButtonsProps } from "./types";

export const TableButtons = ({ onDelete, editTo, pageTo }: TableButtonsProps) => {
  return (
    <Space size="small">
      <NavLink to={editTo}>
        <Button icon={<EditOutlined />} />
      </NavLink>
      <Button danger icon={<DeleteOutlined />} onClick={onDelete} />
      {pageTo && (
        <NavLink to={pageTo}>
          <Button icon={<EyeOutlined />} />
        </NavLink>
      )}
    </Space>
  );
};
