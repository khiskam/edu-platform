import { Form, Input } from "antd";
import { FieldValues, useController } from "react-hook-form";

import { formItem } from "./styled";
import { TextFieldProps } from "./types";

const { TextArea, Password } = Input;

export const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { label, placeholder, type, control, onChange } = props;

  const {
    field,
    fieldState: { error },
  } = useController(control);

  const handleChange = (e: React.ChangeEvent) => {
    field.onChange(e);
    onChange?.(e);
  };

  const inputData = { ...field, placeholder, type, onChange: handleChange };

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : "validating"}
      help={error?.message}
      className={formItem}
    >
      {type === "input" ? (
        <Input {...inputData} />
      ) : type === "textarea" ? (
        <TextArea {...inputData} />
      ) : (
        <Password {...inputData} autoComplete="on" />
      )}
    </Form.Item>
  );
};
