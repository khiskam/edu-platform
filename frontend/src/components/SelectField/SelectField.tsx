import { ConfigProvider, Form, Select } from "antd";
import { FieldValues, useController } from "react-hook-form";

import { formItem } from "./styled";
import { TextFieldProps } from "./types";

export const SelectField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { label, placeholder, control, options } = props;

  const {
    field,
    fieldState: { error },
  } = useController(control);

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : "validating"}
      help={error?.message}
      className={formItem}
    >
      <ConfigProvider renderEmpty={() => "Здесь пока нет категорий..."}>
        <Select
          {...field}
          placeholder={placeholder}
          options={options}
          defaultValue={options?.[0].value}
        />
      </ConfigProvider>
    </Form.Item>
  );
};
