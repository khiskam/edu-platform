import { Breadcrumb as AntdBreadcrumb } from "antd";

import { useBreadcrumb } from "./utils";

export const Breadcrumb = () => {
  const items = useBreadcrumb();

  return <AntdBreadcrumb items={items} />;
};
