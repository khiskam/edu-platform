import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import Button from "antd/es/button";
import Space from "antd/es/space";
import { NavLink } from "react-router-dom";

import { TableButtonsProps } from "./types";

export const TableButtons = ({ onDelete, editTo, pageTo }: TableButtonsProps) => {
  return (
    <Space size="small">
      <NavLink to={editTo}>
        <Button icon={<EditOutlined />} />
      </NavLink>

      <Button danger icon={<DeleteOutlined />} onClick={onDelete} />

      <NavLink to={pageTo}>
        <Button icon={<EyeOutlined />} />
      </NavLink>
    </Space>
  );
};
