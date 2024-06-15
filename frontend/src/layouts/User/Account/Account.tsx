import List from "antd/es/list";
import { NavLink } from "react-router-dom";

import { ACCOUNT_PAGES } from "./constants";

export const Account = () => {
  return (
    <List
      dataSource={ACCOUNT_PAGES}
      renderItem={(item) => (
        <List.Item extra={<NavLink to={item.path}>Перейти</NavLink>}>{item.label}</List.Item>
      )}
    />
  );
};
