import MinusCircleOutlined from "@ant-design/icons/MinusCircleOutlined";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import { FieldValues, useFieldArray } from "react-hook-form";

import { Fields } from "@/components";
import { GAP } from "@/shared/theme";

import { AnswerFieldsProps } from "./types";

export const AnswerFields = <T extends FieldValues>({
  control,
  name,
  initValue,
  checkboxName,
  textName,
  label,
  placeholder,
  rootError,
}: AnswerFieldsProps<T>) => {
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
              <Fields.Checkbox control={{ control, name: checkboxName(index) }} />

              <Fields.Text
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
