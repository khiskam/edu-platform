import { Checkbox as AntdCheckbox, CheckboxProps } from "antd";
import { FieldValues, useController } from "react-hook-form";

import { CheckboxFieldProps } from "./types";

export const Checkbox = <T extends FieldValues>(props: CheckboxFieldProps<T>) => {
  const { label, classname, control } = props;
  const { field } = useController(control);

  const handleChange: CheckboxProps["onChange"] = (e) => {
    field.onChange(e);
  };

  return (
    <AntdCheckbox className={classname} onChange={handleChange} checked={field.value}>
      {label}
    </AntdCheckbox>
  );
};
