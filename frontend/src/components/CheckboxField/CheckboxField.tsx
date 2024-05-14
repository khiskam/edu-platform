import { Checkbox } from "antd";

import { CheckboxFieldProps } from "./types";

export const CheckboxField = <T extends object>(props: CheckboxFieldProps<T>) => {
  const { label } = props;

  return <Checkbox style={{ display: "flex", alignItems: "start" }}>{label}</Checkbox>;
};
