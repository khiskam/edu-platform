import { Form, Input } from "antd";
import { useController } from "react-hook-form";

import { FormFieldProps } from "./types";

const { TextArea, Password } = Input;

export const FieldInput = ({
  label,
  placeholder,
  type,
  control,
  onChange,
}: FormFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController(control);

  const handleChange = (e: React.ChangeEvent) => {
    field.onChange(e);
    onChange?.(e);
  };

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : "validating"}
      help={error?.message}
    >
      {type === "input" ? (
        <Input {...field} onChange={handleChange} placeholder={placeholder} />
      ) : type === "password" ? (
        <Password
          {...field}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ) : (
        <TextArea
          {...field}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </Form.Item>
  );
};

// export const FieldCheckbox = ({ control }: FormFieldProps) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController(control);
//   return <Checkbox></Checkbox>;
// };
