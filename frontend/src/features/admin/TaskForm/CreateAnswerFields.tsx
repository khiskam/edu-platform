import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Form } from "antd";
import { FieldValues, useFieldArray } from "react-hook-form";

import { CheckboxField, TextField } from "@/components";
import { GAP } from "@/shared/constants";

import { CreateAnswerFieldsProps } from "./types";

export const CreateAnswerFields = <T extends FieldValues>({
  control,
  name,
  initValue,
  checkboxName,
  textName,
  label,
  placeholder,
  rootError,
}: CreateAnswerFieldsProps<T>) => {
  const { fields, append, remove } = useFieldArray({ control, name });
  const addField = () => append(initValue);

  return (
    <>
      {fields.length > 0 && (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={rootError ? "error" : "validating"}
          help={rootError}
        >
          {fields.map((field, index) => (
            <Flex align="center" gap={GAP[12]} key={field.id}>
              <CheckboxField control={{ control, name: checkboxName(index) }} />

              <TextField
                control={{ control, name: textName(index) }}
                placeholder={`${placeholder} ${index + 1}`}
                type="input"
                label={`${label} ${index + 1}`}
              />

              {index > 1 && (
                <Button type="text" icon={<MinusCircleOutlined />} onClick={() => remove(index)} />
              )}
            </Flex>
          ))}
        </Form.Item>
      )}

      <Form.Item>
        <Button onClick={addField} disabled={fields.length === 6} icon={<PlusCircleOutlined />}>
          Добавить ответ
        </Button>
      </Form.Item>
    </>
  );
};
