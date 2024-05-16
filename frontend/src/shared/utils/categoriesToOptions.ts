import { SelectProps } from "antd";

import { Category } from "../types";

export const categoriesToOptions = (categories?: Category[]): SelectProps["options"] => {
  if (!categories) {
    return undefined;
  }

  return categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
