import List from "antd/es/list";
import { NavLink } from "react-router-dom";

import { ADMIN_PAGES } from "./constants";

export const Panel = () => {
  return (
    <List
      dataSource={ADMIN_PAGES}
      renderItem={(item) => (
        <List.Item extra={<NavLink to={item.path}>Перейти</NavLink>}>{item.label}</List.Item>
      )}
    />
  );
};
