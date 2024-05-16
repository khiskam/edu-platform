import { Checkbox, CheckboxProps } from "antd";
import { FieldValues, useController } from "react-hook-form";

import { CheckboxFieldProps } from "./types";

export const CheckboxField = <T extends FieldValues>(props: CheckboxFieldProps<T>) => {
  const { label, classname, control } = props;
  const { field } = useController(control);

  const handleChange: CheckboxProps["onChange"] = (e) => {
    field.onChange(e);
  };

  return (
    <Checkbox className={classname} onChange={handleChange}>
      {label}
    </Checkbox>
  );
};
