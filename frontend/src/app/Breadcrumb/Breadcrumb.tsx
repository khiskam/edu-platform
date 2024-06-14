import AntdBreadcrumb from "antd/es/breadcrumb";

import { useBreadcrumb } from "./hooks";

export const Breadcrumb = () => {
  const items = useBreadcrumb();

  return <AntdBreadcrumb items={items} />;
};
