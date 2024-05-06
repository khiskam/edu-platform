import { Form, Input } from "antd";
import { ChangeEvent } from "react";
import { useController } from "react-hook-form";

import { FormItemProps } from "./types";

export const FormField = <T extends Record<string, string>>({
  controller,
  type = "input",
  label,
  placeholder,
  onChange: changeHandler,
}: FormItemProps<T>) => {
  const { field, fieldState } = useController(controller);
  const { error } = fieldState;
  const { onChange, ...data } = field;

  const handleChange = (e: ChangeEvent) => {
    onChange(e);
    changeHandler?.(e);
  };

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : "validating"}
      help={error?.message}
    >
      {type === "password" ? (
        <Input.Password
          role="textbox"
          aria-label={field.name}
          placeholder={placeholder}
          autoComplete="on"
          onChange={handleChange}
          {...data}
        />
      ) : (
        <Input
          role="textbox"
          aria-label={field.name}
          placeholder={placeholder}
          onChange={handleChange}
          {...data}
        />
      )}
    </Form.Item>
  );
};
